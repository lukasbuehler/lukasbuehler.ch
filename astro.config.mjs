import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { copyFile } from "node:fs/promises";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkWikiLinks from "./src/plugins/wiki-links.mjs";
const site = process.env.SITE_URL || "https://lukasbuehler.ch";
export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap(),
    {
      name: "sitemap-alias",
      hooks: {
        "astro:build:done": async ({ dir }) => {
          await copyFile(
            new URL("sitemap-index.xml", dir),
            new URL("sitemap.xml", dir),
          );
        },
      },
    },
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkWikiLinks],
    rehypePlugins: [rehypeKatex],
    shikiConfig: { theme: "github-light" },
  },
  redirects: { "/workspace": "/projects", "/hobbies": "/notes" },
});
