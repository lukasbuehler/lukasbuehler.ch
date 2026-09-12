import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const entries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/entries' }),
  schema: z.object({
    title: z.string(), description: z.string(), kind: z.enum(['note', 'project']),
    draft: z.boolean().default(false), featured: z.number().optional(),
    topics: z.array(z.string()).default([]), status: z.string().optional(), updated: z.coerce.date().optional(),
    image: z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() }).optional(),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
  }),
});
export const collections = { entries };
