import type { APIRoute } from "astro";
import { sharingPages } from "../../../lib/sharing-pages";
import { renderCard } from "../../../lib/sharing";
export const prerender = true;
export function getStaticPaths() {
  return Object.entries(sharingPages).map(([page, content]) => ({
    params: { page },
    props: { content },
  }));
}
export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await renderCard(props.content)), {
    headers: { "Content-Type": "image/png" },
  });
