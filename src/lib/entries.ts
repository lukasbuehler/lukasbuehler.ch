import { getCollection, type CollectionEntry } from 'astro:content';
export type Entry = CollectionEntry<'entries'>;
export const entryUrl = (entry: Entry) => `/${entry.data.kind === 'project' ? 'projects' : 'notes'}/${entry.id}/`;
export async function publishedEntries() {
  const entries = await getCollection('entries', ({ data }) => !data.draft);
  const known = new Set(entries.map(entryUrl));
  for (const entry of entries) {
    for (const target of linkedPaths(entry)) {
      if (!known.has(target)) throw new Error(`${entry.id} links to missing or unpublished entry ${target}`);
    }
  }
  return entries.sort((a, b) => (a.data.featured ?? Infinity) - (b.data.featured ?? Infinity) || a.data.title.localeCompare(b.data.title));
}
export function linkedPaths(entry: Entry) {
  const body = (entry.body ?? '').replace(/```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]*`/g, '');
  const paths = [...body.matchAll(/\[\[((?:notes|projects)\/[a-z0-9-]+)(?:\|[^\]]+)?\]\]|\]\(\/?((?:notes|projects)\/[a-z0-9-]+)\/?(?:#[^\s)]*)?\)/g)];
  return new Set(paths.map(match => `/${match[1] ?? match[2]}/`));
}
export const backlinks = (entry: Entry, entries: Entry[]) => entries.filter(other => other.id !== entry.id && linkedPaths(other).has(entryUrl(entry)));
