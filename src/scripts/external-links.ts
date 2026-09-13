function updateExternalLinks() {
  const canonical = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  const siteOrigin = new URL(canonical?.href ?? window.location.href).origin;
  for (const link of document.querySelectorAll<HTMLAnchorElement>("a[href]")) {
    const url = new URL(link.href);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.origin === window.location.origin ||
      url.origin === siteOrigin
    )
      continue;
    link.target = "_blank";
    link.relList.add("noopener", "noreferrer");
  }
}

updateExternalLinks();
document.addEventListener("astro:page-load", updateExternalLinks);
