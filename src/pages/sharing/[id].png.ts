import type { APIRoute } from "astro";
import { publishedEntries } from "../../lib/entries";
import { renderSharingCard } from "../../lib/sharing";
export const prerender = true;
export async function getStaticPaths() {
  return (await publishedEntries()).map((entry) => ({
    params: { id: entry.id },
    props: { entry },
  }));
}
export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await renderSharingCard(props.entry)), {
    headers: { "Content-Type": "image/png" },
  });
