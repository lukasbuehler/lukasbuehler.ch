# Lukas Bühler’s digital garden

A static Astro site for `https://lukasbuehler.ch`. Modern typography, a shared responsive grid, selected projects, and connected notes. No carousel, background animation, or third-party embed loads by default. Optional PostHog analytics is disabled until configured.

## Run locally

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
npm run preview
```

`npm test` builds the site, checks page metadata and links, temporarily adds MD/MDX fixtures to verify maths and draft boundaries, and removes them before rebuilding the real site. Run it without another build or content-editing process in parallel.

`npm run format` formats the source. The build output is `dist/`. `public/_redirects` preserves the former Workspace and Hobbies URLs on Cloudflare.

## Cloudflare deployment

The `lukasbuehler-ch` Worker serves Astro's static output using `wrangler.jsonc`; no server adapter is needed. Cloudflare's Git integration should build `main` from repository root with `npm run build`, then deploy with `npx wrangler deploy`. `.node-version` selects Node 24. Keep working on `development` and merge reviewed changes into `main` to publish.

Set `PUBLIC_POSTHOG_KEY` and `PUBLIC_POSTHOG_ENABLED` as build variables (see Analytics below). Only `dist/` is deployed. Ignored `private-assets/` originals are neither committed nor published. To validate deployment configuration locally after a build, run `npx wrangler deploy --dry-run`. The Worker can be previewed on its `workers.dev` URL before connecting `lukasbuehler.ch`; analytics stays disabled on that preview hostname.

## Write a page

Create a Markdown `.md` or MDX `.mdx` file directly in `src/content/entries/`. Use a stable lowercase, hyphenated filename, such as `learning-to-walk-again.md`. The filename determines its URL; the title can change independently.

```yaml
---
title: Learning to walk again
description: A short description of what this page is about.
kind: note
draft: true
published: 2026-09-12
topics: [Movement]
---
```

Write below the frontmatter. Start body sections with `##`: the layout supplies the single H1 from `title`.

Set `draft: false` to include a page in the site. Published notes require a `published: YYYY-MM-DD` date. This stays as the original publication date; add `updated` separately for substantive revisions. Note indexes show newest first, while homepage selection remains controlled by `featured`. Omitted `draft` also means draft. Drafts have no generated route, listing, backlink, or sitemap entry, even in the normal development server. To preview one, temporarily set it to false locally, then restore it before committing. Draft filtering does not make files in `public/` private: anything placed there is copied into the build. Keep unapproved academic assets outside `public/` and outside a public repository.

A `kind: project` page lives at `/projects/filename/`; a note lives at `/notes/filename/`. Keep a note’s kind stable when it leads to a project: create a project overview and link the two instead of moving the original note.

## Connect pages

```md
This question led to [[projects/aegis|Aegis]].

An ordinary [link to the note](/notes/looking-for-signals/) works too.
```

Wiki links use explicit `projects/` or `notes/` paths, with an optional label after `|`. Use root-relative paths for ordinary Markdown links. These wiki and inline Markdown links create automatic **Linked from** lists. Links inside code examples are ignored. HTML links and reference-style Markdown links work in the page but are not currently included in automatic backlinks. Linking to an unpublished or missing entry using the supported notation fails the build.

## Maths and HTML

Inline maths uses `$z = f_\theta(x)$`. Display maths uses:

```tex
$$
\mathcal{L} = \lVert x - \hat{x} \rVert_2^2
$$
```

Maths is rendered at build time with KaTeX, including MathML; no external script is needed. Markdown supports ordinary HTML. Choose MDX for imported components and richer layouts; its HTML uses JSX syntax, including self-closing tags. `src/content/entries/authoring-example.mdx` is an unpublished working example.

## Images and video

Once images are ready, put public files in `public/images/`. Add an image to a project’s frontmatter:

```yaml
image:
  src: /images/my-project.webp
  alt: A specific description of what the image shows.
  caption: A short factual caption.
```

Project images appear on their project pages and in generated sharing cards. The homepage and Projects index show compact project thumbnails beside the card text; no large image is added above the homepage sections.

Inside an MDX page:

```mdx
import Figure from "../../components/content/Figure.astro";
import Video from "../../components/content/Video.astro";

<Figure
  src="/images/sketch.webp"
  alt="Description of the sketch"
  caption="An early sketch."
/>

<Video
  src="/videos/demo.mp4"
  poster="/images/demo.webp"
  caption="A demonstration of the prototype."
>
  <track
    kind="captions"
    src="/videos/demo.en.vtt"
    srcLang="en"
    label="English"
    default
  />
</Video>
```

Video plays only when the reader chooses; provide captions for spoken material. No automatic Instagram or YouTube feeds are included. An ordinary external link is enough until a specific embed earns its place.

## Curate the homepage

Add `featured: 1` (or another number) to selected entries. Lower numbers come first. Home shows up to two selected personal projects, two selected academic projects, and three selected notes. Set `projectGroup: academic` for academic work; projects default to `personal`. The Projects page lists all published projects under these two groups. Entries without `featured` still appear in their index. Keep the homepage small as the interior grows.

Optional metadata:

- `status`: a factual state, such as `Early exploration`.
- `updated`: a date, such as `2026-09-12`; only appears when explicitly supplied.
- `links`: a list of `{ label, url }` links to the actual project, repository, or paper.
- `topics`: lightweight descriptions; no empty category pages or filter controls.

Starter text for PK Spot, Aegis, the first note, and About is intentionally brief and based on the initial discussion. Review and expand it with real material before public launch. Academic work, contact details, and personal stories have not been invented.

## Design and structure

- `src/layouts/GardenLayout.astro`: shared navigation, footer, and SEO metadata.
- `src/layouts/EntryLayout.astro`: article structure and backlinks.
- `src/styles/global.css`: colours, typography, grid, and responsive rules.
- `src/content.config.ts`: authoring schema and draft defaults.
- `src/lib/entries.ts`: public entry selection, URL generation, and link validation.
- `src/plugins/wiki-links.mjs`: Markdown wiki-link rendering.

The previous mobile failures came from fixed screen dimensions, absolute placement, and viewport-height rooms. The new layout uses ordinary document flow and shared grid breakpoints. Navigation does not capture scroll events.

Canonical URLs, Open Graph tags, the sitemap, and robots.txt target `https://lukasbuehler.ch`. `SITE_URL` can override the origin for a deliberate alternate build. There are no guarantees of indexing until the site is deployed and crawled.

## Before deployment

Gather imagery, review the starter copy, add any desired project links/contact details, and confirm permission for academic material. The September 12 dependency audit reports 15 advisories (2 low, 12 high, 1 critical) in the existing Astro 5 toolchain and its dependency graph. The critical report includes Astro image optimization; the site currently outputs static HTML and does not use that feature. A framework/dependency upgrade and fresh audit remain release work, separate from this design change. Do not expose the development server publicly.

## Optional EU analytics

Copy `.env.example` to `.env` and set the public **EU project token** in `PUBLIC_POSTHOG_KEY` (never a personal API key). Enable **Cookieless server hash mode** under PostHog Project Settings → Web analytics, then set `PUBLIC_POSTHOG_ENABLED=true` and rebuild. In Cloudflare, set these as build environment variables. Analytics remains off without both settings and only runs on HTTPS `lukasbuehler.ch`; local previews and `pages.dev` hosts never track.

The no-external PostHog SDK loads only after checking Do Not Track (including legacy variants) and Global Privacy Control. Both signals block initialization entirely. The SDK’s cookieless consent behavior alone is not used as the privacy gate. There are no opt-in/out SDK calls: in `always` mode those do not provide the desired hard-stop behavior.

Only `$pageview` events with a cookieless sentinel are permitted. Before sending, an allowlist removes referrers, URL queries/fragments, campaign parameters, device/session IDs, and other automatically collected properties. Canonical page addresses and required event fields remain. Autocapture, replay, profiles, surveys, feature flags, remote configuration, logs, performance, and errors are disabled. The SDK uses memory and disables persistence. No analytics identifiers are persisted in cookies or browser storage; an opt-out is expressed through DNT/GPC or a content blocker rather than a stored preference.

`/privacy/` explains this configuration and honestly reports when analytics is disabled. It is an analytics notice, not yet a complete launch privacy policy: controller contact details, actual hosting configuration, applicable processing grounds, retention, vendor agreements, and international processing still need to be confirmed before enabling production analytics. EU hosting does not by itself resolve consent or all international-transfer questions.

No click-wrap has been added. Acknowledging a privacy notice and consenting to analytics are different things. Cookieless is not synonymous with no personal-data processing: PostHog receives IP/user-agent information and calculates a daily server hash. Determine whether notice plus an effective opt-out is sufficient for the actual audience and processing; if prior consent is required, add a consent gate **before** SDK loading, without withholding access to the garden.

References checked 13 September 2026:

- [PostHog cookieless configuration and project prerequisites](https://posthog.com/tutorials/cookieless-tracking)
- [PostHog JavaScript configuration](https://posthog.com/docs/libraries/js/config)
- [FDPIC information obligations](https://www.edoeb.admin.ch/de/informationspflicht)
- [FDPIC cookie guidance](https://www.edoeb.admin.ch/en/cookies-practical-tips)
- [EDPB technical scope of ePrivacy Article 5(3)](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-22023-technical-scope-art-53-eprivacy-directive_en)

Browser verification with the real SDK (requests intercepted, no data sent to PostHog): DNT and GPC each produced zero SDK chunk loads, zero third-party requests, and zero storage writes. Without a privacy signal there was one EU pageview request, zero cookies, and empty local/session storage afterward. The SDK briefly writes and removes support-probe keys (`__mplssupport__` and `test`) during initialization; it does not persist analytics identifiers. This is why the policy describes no analytics persistence rather than promising that the SDK never touches storage.

To repeat the isolated check: build with a dummy token into `/private/tmp/digital-garden-analytics-build`, serve that directory on `127.0.0.1:4323`, and run the Playwright CLI with `run-code --filename tests/analytics.browser.js`. The script intercepts every browser request, serves the garden from that local directory through its local HTTP server, and returns fake success for PostHog; it never sends test data to a real project. Normal `npm test` remains browser-independent.

## Research media awaiting publication

`private-assets/` holds local thesis PDFs and image originals awaiting review. It is Git-ignored and outside Astro’s published directories; Git does not back it up. Keep originals there, and copy only approved publication versions into `public/documents/` or `public/images/`. A declaration-bearing PDF should be checked for signatures and personal details before publication.

For a project’s lead image, use the existing `image` frontmatter (`src`, `alt`, `caption`). It appears on the project page and supplies its sharing image; project lists show compact thumbnails alongside their text. Use Markdown images or the MDX `Figure` and `Video` components for additional explanatory media. Captions should distinguish AI-altered illustrations from documentary research imagery.

## Link sharing previews

Every published project and note gets a static **1200 × 630 PNG** at `/sharing/<entry-id>.png`. `npm run build` generates these with local Inter fonts, Satori, and Sharp; no remote font service, browser JavaScript, or production image server is needed. Drafts do not get cards.

Project cards use the title and existing project image, fitted without cropping. Academic cards use `projectType` (such as `Master’s thesis`) as their label, falling back to `Academic project`. Projects without images and notes use a typographic layout; notes include their publication date. The template follows the site’s paper colour, dark text and thin rules. The master’s image retains a short AI-editing disclosure.

The full title is used automatically. Optionally add `shareTitle: A shorter title for sharing` (up to 160 characters) to frontmatter for particularly long titles; this changes only the card artwork, not the page heading or SEO title. Long titles shrink to fit, and the build fails if text cannot fit rather than silently clipping it. Images must be local files under `public/`.

Open Graph and Twitter large-image tags include absolute URLs, descriptive alt text, PNG type and dimensions. The common 1200 × 630 format is close to [LinkedIn’s 1200 × 627 preview frame](https://www.linkedin.com/help/linkedin/answer/a525301/sharing-articles-or-links?lang=en); generous margins accommodate small platform crops. Platforms control their final display and may cache previews. After deployment, use LinkedIn’s Post Inspector to refresh a changed URL. Local builds verify the files and tags, not live platform rendering.

Preview cards locally at `http://127.0.0.1:4322/sharing/relative-imitation-learning-uav.png` (or another entry ID). Design lives in `src/lib/sharing.ts`, and the static endpoint in `src/pages/sharing/[id].png.ts`. Generated images stay in `dist/`, not Git. The Satori-specific fflate override keeps its 0.7-series dependency on the patched release.

## Aviz interactive CAD

Aviz uses `model: aviz-mk1` alongside its ordinary `image` frontmatter. The still remains visible without JavaScript and becomes the sharing-card image. “Explore in 3D” loads Three.js and the approximately 5.5 MB model only on request. Drag or focus the canvas and use arrow keys to rotate; buttons zoom and reset; the slider moves all four tilts around the exported shaft axes. This previews geometry, not flight dynamics or collision clearance. No automatic rotation or continuous render loop is used.

`public/models/aviz-mk1/prototype.json` and `src/lib/aviz/cad-model.js` are copied unchanged from the supplied Aviz repository export. The original repo remains untouched. To refresh, copy those same files from the Aviz repo, rebuild, and recapture the neutral canvas as `public/images/projects/aviz-mk1.png`; rebuild again to refresh the sharing card. Keep the complete `meshes` and `vehicle` fields together. The website serves this model publicly as part of the project.

## Colour theme

The footer offers System / Light / Dark. System is the default and follows OS changes, including without JavaScript. Explicit preferences use the local-only `garden-theme` localStorage key; choosing System removes it. The small inline head script applies the preference before the page paints and tolerates blocked storage. Images, the CAD scene, and generated sharing cards retain their original colours. Dark-mode colours live alongside the light palette in `src/styles/global.css`.

Home, About, Projects and Notes also receive static sharing cards at `/sharing/pages/<page>.png` (`home`, `about`, `projects`, `notes`). Their wording lives in `src/lib/sharing-pages.ts`; the shared layout selects the correct metadata automatically.
