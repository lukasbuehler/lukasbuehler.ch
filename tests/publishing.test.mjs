import { test } from "node:test";
import assert from "node:assert/strict";
import {
  readFileSync,
  writeFileSync,
  rmSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import { join, relative } from "node:path";

const build = () =>
  execFileSync(process.execPath, ["node_modules/astro/astro.js", "build"], {
    stdio: "pipe",
  });
const read = (path) => readFileSync(path, "utf8");
const content = "src/content/entries";

function checkPages(directory = "dist") {
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) {
      checkPages(path);
      continue;
    }
    if (!path.endsWith(".html")) continue;
    const html = read(path);
    if (/http-equiv="refresh"/i.test(html)) continue;
    const scripts = [
      ...html.matchAll(
        /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ];
    assert.equal(scripts.length, 1, `${path}: one structured data graph`);
    const schema = JSON.parse(scripts[0][1]);
    assert.equal(schema["@context"], "https://schema.org");
    const node = (type) =>
      schema["@graph"].find((item) => item["@type"] === type);
    assert.equal(node("Person").name, "Lukas Bühler");
    assert.equal(node("WebSite").url, "https://lukasbuehler.ch/");
    if (path.endsWith("about/index.html"))
      assert.ok(node("AboutPage").mainEntity);
    if (/\/(notes|projects)\/[^/]+\/index.html$/.test(path)) {
      const work = node(
        path.includes("/notes/") ? "BlogPosting" : "CreativeWork",
      );
      assert.ok(work, `${path}: appropriate entry type`);
      assert.equal(work.author["@id"], node("Person")["@id"]);
      assert.equal(work.mainEntityOfPage["@id"], node("WebPage")["@id"]);
      assert.ok(node("BreadcrumbList"));
      if (path.includes("/notes/")) assert.ok(work.datePublished);
    }
    if (/\/(notes|projects)\/index.html$/.test(path)) {
      assert.equal(node("CollectionPage").mainEntity["@type"], "ItemList");
      assert.ok(!scripts[0][1].includes("garden-check-private"));
    }
    assert.equal(
      [...html.matchAll(/<h1(?:\s|>)/g)].length,
      1,
      `${path}: one H1`,
    );
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /name="description" content="[^"]+"/);
    assert.match(html, /rel="canonical" href="https:\/\/lukasbuehler.ch\//);
    assert.ok(
      !html.replace(/<code[\s\S]*?<\/code>/g, "").includes("[[projects/"),
      `${path}: unresolved wiki link`,
    );
    if (html.includes('property="og:type" content="article"')) {
      const card = html.match(
        /property="og:image" content="https:\/\/lukasbuehler.ch(\/sharing\/[^"]+\.png)"/,
      );
      assert.ok(card, `${path}: generated sharing image`);
      const png = readFileSync(join("dist", card[1]));
      assert.equal(png.readUInt32BE(16), 1200);
      assert.equal(png.readUInt32BE(20), 630);
      assert.ok(png.length < 5_000_000, `${path}: sharing image under 5 MB`);
      assert.match(html, /name="twitter:image"/);
      assert.match(html, /property="og:image:alt"/);
    }
    for (const [, href] of html.matchAll(/href="(\/[^"#]*)(?:#[^"]*)?"/g)) {
      const target = join("dist", href);
      assert.ok(
        existsSync(target) || existsSync(join(target, "index.html")),
        `${relative("dist", path)}: broken link ${href}`,
      );
    }
  }
}

test("published output, MD/MDX maths, backlinks, and draft boundaries", () => {
  const fixtures = [
    "garden-check-md.md",
    "garden-check-mdx.mdx",
    "garden-check-private.md",
  ];
  try {
    build();
    checkPages();
    for (const [page, path] of [
      ["home", ""],
      ["about", "about/"],
      ["projects", "projects/"],
      ["notes", "notes/"],
    ]) {
      const html = read(`dist/${path}index.html`);
      assert.ok(
        html.includes(`https://lukasbuehler.ch/sharing/pages/${page}.png`),
      );
      const png = readFileSync(`dist/sharing/pages/${page}.png`);
      assert.equal(png.readUInt32BE(16), 1200);
      assert.equal(png.readUInt32BE(20), 630);
    }
    assert.ok(!existsSync("dist/notes/authoring-example/index.html"));
    const sitemap = read("dist/sitemap-0.xml");
    assert.equal(read("dist/sitemap.xml"), read("dist/sitemap-index.xml"));
    assert.match(
      read("dist/robots.txt"),
      /Sitemap: https:\/\/lukasbuehler.ch\/sitemap.xml/,
    );
    assert.match(read("dist/llms.txt"), /^# Lukas Bühler/);
    assert.ok(!read("dist/llms.txt").includes("authoring-example"));
    assert.ok(!sitemap.includes("authoring-example"));
    assert.ok(!sitemap.includes("/workspace"));
    const header = (title) =>
      `---\ntitle: ${title}\ndescription: Publishing integration fixture\nkind: note\ndraft: false\npublished: 2026-09-12\n---\n\n`;
    const body =
      String.raw`Inline $z = f_\theta(x)$.

$$
\mathcal{L} = \lVert x - \hat{x} \rVert_2^2
$$

An ordinary [project link](/projects/aegis/).

A [[projects/pk-spot|wiki link]].

<div>HTML authoring works.</div>

` + "`[[projects/this-is-code]]`";
    writeFileSync(
      join(content, fixtures[0]),
      header("Markdown fixture") + body,
    );
    writeFileSync(join(content, fixtures[1]), header("MDX fixture") + body);
    // Omitted draft is private by default.
    writeFileSync(
      join(content, fixtures[2]),
      "---\ntitle: Private fixture\ndescription: Must never be published\nkind: note\n---\nPRIVATE_FIXTURE_MARKER",
    );
    build();
    checkPages();
    for (const id of ["garden-check-md", "garden-check-mdx"]) {
      const html = read(`dist/notes/${id}/index.html`);
      assert.match(html, /class="katex"/);
      assert.match(html, /<time datetime="2026-09-12">/);
      assert.match(html, /12 September 2026/);
      assert.match(
        html,
        /property="article:published_time" content="2026-09-12T00:00:00.000Z"/,
      );
      assert.match(html, /class="katex-display"/);
      assert.match(html, /<math /);
      assert.match(html, /href="\/projects\/pk-spot\/"/);
      assert.match(html, /HTML authoring works/);
      assert.match(html, /<code>\[\[projects\/this-is-code\]\]<\/code>/);
    }
    assert.ok(!existsSync("dist/notes/garden-check-private/index.html"));
    assert.ok(!existsSync("dist/sharing/garden-check-private.png"));
    assert.ok(!read("dist/sitemap-0.xml").includes("garden-check-private"));
    const llms = read("dist/llms.txt");
    assert.ok(!llms.includes("garden-check-private"));
    assert.ok(!llms.includes("PRIVATE_FIXTURE_MARKER"));
    assert.ok(llms.includes("https://lukasbuehler.ch/notes/garden-check-md/"));
    assert.ok(read("dist/sitemap-0.xml").includes("/notes/garden-check-md/"));
    assert.match(read("dist/projects/pk-spot/index.html"), /Markdown fixture/);
    assert.match(read("dist/projects/pk-spot/index.html"), /MDX fixture/);
    writeFileSync(
      join(content, fixtures[0]),
      header("Invalid link fixture") +
        "[[notes/garden-check-private|Private page]]",
    );
    const invalid = spawnSync(
      process.execPath,
      ["node_modules/astro/astro.js", "build"],
      { encoding: "utf8" },
    );
    assert.notEqual(invalid.status, 0);
    assert.match(
      invalid.stdout + invalid.stderr,
      /missing or unpublished entry/,
    );
  } finally {
    fixtures.forEach((file) => rmSync(join(content, file), { force: true }));
    build();
  }
});
