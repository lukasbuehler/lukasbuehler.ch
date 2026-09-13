import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { createRequire } from "node:module";
import satori from "satori";
import sharp from "sharp";
import type { Entry } from "./entries";

export const cardSize = { width: 1200, height: 630 };
export const sharingUrl = (entry: Entry) => `/sharing/${entry.id}.png`;
const require = createRequire(import.meta.url);
const font = readFile(
  require.resolve("@fontsource/inter/files/inter-latin-500-normal.woff"),
);
const ink = "#202b25";
const muted = "#5e685e";
const paper = "#f5f6f0";
const box = (style: Record<string, unknown>, children: unknown) => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
});

async function projectImage(src: string) {
  const root = resolve("public");
  const path = resolve(root, src.replace(/^\//, ""));
  if (
    !src.startsWith("/") ||
    src.startsWith("//") ||
    !path.startsWith(root + sep)
  )
    throw new Error(`Sharing cards require an image inside public/: ${src}`);
  const bytes = await sharp(await readFile(path))
    .resize(510, 380, {
      fit: "contain",
      background: paper,
    })
    .png()
    .toBuffer();
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

export async function renderSharingCard(entry: Entry) {
  const { data } = entry;
  const title = data.shareTitle ?? data.title;
  const image =
    data.kind === "project" && data.image
      ? await projectImage(data.image.src)
      : undefined;
  const label =
    data.kind === "note"
      ? "Note"
      : data.projectGroup === "academic"
        ? (data.projectType ?? "Academic project")
        : "Personal project";
  const date =
    data.kind === "note" && data.published
      ? new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(data.published)
      : "";
  // Measure the title and reduce type until even unusually long titles fit.
  for (let size = image ? 48 : 68; size >= 24; size -= 2) {
    let titleHeight = 0;
    const titleNode = box(
      {
        fontSize: size,
        lineHeight: 1.1,
        letterSpacing: "-0.045em",
        overflowWrap: "break-word",
      },
      title,
    );
    titleNode.props = { ...titleNode.props, ...{ "data-title": true } };
    const svg = await satori(
      box(
        {
          ...cardSize,
          padding: 48,
          flexDirection: "column",
          backgroundColor: paper,
          color: ink,
          fontFamily: "Inter",
          fontWeight: 500,
        },
        [
          box(
            {
              justifyContent: "space-between",
              fontSize: 22,
              paddingBottom: 22,
              borderBottom: "1px solid #c8cec0",
            },
            ["Lukas Bühler", box({ color: muted }, label)],
          ),
          box({ flex: 1, alignItems: "center", gap: 42 }, [
            box(
              { width: image ? 552 : 1050, flexDirection: "column", gap: 24 },
              [
                titleNode,
                ...(date ? [box({ fontSize: 20, color: muted }, date)] : []),
              ],
            ),
            ...(image
              ? [
                  {
                    type: "img",
                    props: { src: image, width: 510, height: 380 },
                  },
                ]
              : []),
          ]),
          box(
            {
              justifyContent: "space-between",
              borderTop: "1px solid #c8cec0",
              paddingTop: 20,
              fontSize: 18,
              color: muted,
            },
            [
              box({}, "lukasbuehler.ch"),
              box(
                {},
                data.image?.caption?.startsWith("AI-edited") && image
                  ? "AI-edited image"
                  : "Digital garden",
              ),
            ],
          ),
        ],
      ) as Parameters<typeof satori>[0],
      {
        ...cardSize,
        fonts: [
          { name: "Inter", data: await font, weight: 500, style: "normal" },
        ],
        onNodeDetected: (node) => {
          if (node.props?.["data-title"]) titleHeight = node.height;
        },
      },
    );
    if (titleHeight <= (date ? 320 : 370))
      return sharp(Buffer.from(svg)).png().toBuffer();
  }
  throw new Error(
    `Sharing title is too long for ${entry.id}; add a shorter shareTitle.`,
  );
}
