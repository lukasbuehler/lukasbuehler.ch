import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
const entries = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/entries" }),
  schema: z
    .object({
      title: z.string(),
      shareTitle: z.string().max(160).optional(),
      description: z.string(),
      kind: z.enum(["note", "project"]),
      projectGroup: z.enum(["personal", "academic"]).default("personal"),
      projectType: z.string().optional(),
      draft: z.boolean().default(true),
      featured: z.number().optional(),
      topics: z.array(z.string()).default([]),
      status: z.string().optional(),
      published: z.coerce.date().optional(),
      updated: z.coerce.date().optional(),
      image: z
        .object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        })
        .optional(),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
    })
    .refine((data) => data.draft || data.kind !== "note" || !!data.published, {
      message: "Published notes need a published date (YYYY-MM-DD).",
      path: ["published"],
    }),
});
export const collections = { entries };
