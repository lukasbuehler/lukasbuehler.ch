import { entryUrl, type Entry } from "./entries";

interface PageData {
  canonical: URL;
  title: string;
  description: string;
  image?: URL;
  entry?: Entry;
  entries?: Entry[];
}

export function structuredData({
  canonical,
  title,
  description,
  image,
  entry,
  entries,
}: PageData) {
  const url = canonical.href;
  const absolute = (path: string) => new URL(path, canonical).href;
  const person = { "@id": absolute("/#person") };
  const website = { "@id": absolute("/#website") };
  const pageId = `${url}#webpage`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      ...person,
      name: "Lukas Bühler",
      url: absolute("/about/"),
    },
    {
      "@type": "WebSite",
      ...website,
      url: absolute("/"),
      name: "Lukas Bühler — Digital garden",
      inLanguage: "en",
      author: person,
    },
  ];
  const page: Record<string, unknown> = {
    "@type":
      canonical.pathname === "/about/"
        ? "AboutPage"
        : entries
          ? "CollectionPage"
          : "WebPage",
    "@id": pageId,
    url,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: website,
    ...(image && {
      primaryImageOfPage: { "@type": "ImageObject", url: image.href },
    }),
    ...(canonical.pathname === "/about/" && { mainEntity: person }),
  };
  if (entry) {
    const { data } = entry;
    const workId = `${url}#work`;
    page.mainEntity = { "@id": workId };
    graph.push({
      "@type": data.kind === "note" ? "BlogPosting" : "CreativeWork",
      "@id": workId,
      url,
      name: data.title,
      headline: data.title,
      description,
      author: person,
      mainEntityOfPage: { "@id": pageId },
      inLanguage: "en",
      ...(image && { image: image.href }),
      ...(data.published && { datePublished: data.published.toISOString() }),
      ...(data.updated && { dateModified: data.updated.toISOString() }),
      ...(data.topics.length && { keywords: data.topics }),
      ...(data.projectType && { genre: data.projectType }),
    });
    const parent = data.kind === "note" ? "Notes" : "Projects";
    page.breadcrumb = { "@id": `${url}#breadcrumb` };
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: parent,
          item: absolute(`/${parent.toLowerCase()}/`),
        },
        { "@type": "ListItem", position: 2, name: data.title, item: url },
      ],
    });
  }
  if (entries)
    page.mainEntity = {
      "@type": "ItemList",
      itemListElement: entries.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.data.title,
        url: absolute(entryUrl(item)),
      })),
    };
  graph.push(page);
  // Escape HTML delimiters so authored text cannot terminate the script element.
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
}
