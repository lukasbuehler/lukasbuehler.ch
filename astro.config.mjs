import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkWikiLinks from "./src/plugins/wiki-links.mjs";
const site = process.env.SITE_URL || "https://lukasbuehler.ch";
export default defineConfig({
  site,
  integrations: [mdx(), ...(site ? [sitemap()] : [])],
  markdown: {
    remarkPlugins: [remarkMath, remarkWikiLinks],
    rehypePlugins: [rehypeKatex],
    shikiConfig: { theme: "github-light" },
  },
  redirects: { "/workspace": "/projects", "/hobbies": "/notes" },
});
