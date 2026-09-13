import type { APIRoute } from "astro";
import { entryUrl, projectGroups, publishedEntries } from "../lib/entries";

const text = (value: string) =>
  value.replace(/\s+/g, " ").replace(/[\\`*_[\]<>]/g, "\\$&");

export const GET: APIRoute = async ({ site }) => {
  const entries = await publishedEntries();
  const link = (title: string, path: string, description: string) =>
    `- [${text(title)}](${new URL(path, site)}): ${text(description)}`;
  const sections = [
    "# Lukas Bühler",
    "> A personal digital garden of software, robotics, academic projects, and notes.",
    "Project pages describe their current status. Notes reflect personal views and may evolve over time.",
    "## Website\n\n" +
      [
        link("Home", "/", "Selected projects and recent notes."),
        link("About", "/about/", "Background and interests."),
        link("Projects", "/projects/", "Personal and academic project index."),
        link("Notes", "/notes/", "Published notes."),
      ].join("\n"),
  ];
  for (const group of [...projectGroups, { id: "notes", title: "Notes" }]) {
    const selected = entries.filter(({ data }) =>
      group.id === "notes"
        ? data.kind === "note"
        : data.kind === "project" && data.projectGroup === group.id,
    );
    if (selected.length)
      sections.push(
        `## ${group.title}\n\n` +
          selected
            .map((entry) =>
              link(entry.data.title, entryUrl(entry), entry.data.description),
            )
            .join("\n"),
      );
  }
  return new Response(sections.join("\n\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
