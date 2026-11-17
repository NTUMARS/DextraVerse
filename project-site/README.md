# DextraVerse project website

Public research-platform showcase: hardware and shared interfaces, teleoperation, tactile representations and rewards, imitation/reinforcement learning, and AI-friendly development.

Live site: https://ntumars.github.io/DextraVerse/

## Run locally

Requires Node.js 22.13 or newer and npm.

```sh
cd project-site
npm ci
npm run dev
```

Open the local URL printed by the development server.

## Build

```sh
npm run build
```

The static export is written to `dist/client/`. Serve that directory from a static host at the domain root. For a quick local preview:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist/client
```

## GitHub Pages

Pushing to `main` runs `.github/workflows/project-pages.yml`, which builds the site and
publishes `project-site/dist/client`. The workflow takes its base path from
`actions/configure-pages`, so assets resolve under `/DextraVerse/`. To check locally:

```sh
NEXT_PUBLIC_BASE_PATH=/DextraVerse npm run build
```

## Source map

- `app/page.tsx`: section order, hero links, footer.
- `app/hardware.tsx`, `teleoperation.tsx`, `tactile.tsx`, `policy-learning.tsx`, `ai-coding.tsx`: platform sections.
- `app/experiences.tsx`: hero video controls and retained reusable presentation components.
- `app/globals.css`: Charter typography, orange palette, responsive layout.
- `components/`, `hooks/`, `lib/`: supporting UI code.
- `public/media/`: website-ready videos, posters, images, SVG logo, and paper PDF.
- `public/fonts/charter/`: four webfont styles and original license.
- `docs/`: asset provenance notes.

This snapshot includes the complete tracked website source and web assets, excluding dependency folders, caches, generated builds, and Git history. Original camera files and paper authoring sources are not required to build the website.

## Hosting configuration

`vite.config.ts` retains the existing Vinext / Sites / Cloudflare build integration; `.openai/hosting.json` identifies the existing Sites project. It contains no access token. Do not use that project identifier for a separate deployment. The framework exports a static site via `next.config.ts`.

## Validation

The published source passed TypeScript checking and a production static build. Media paths and navigation anchors were checked in exported HTML. Browser visual/playback verification was not performed in this export.
