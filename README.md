# VPM Documentation

Documentation site for the VPM packages maintained by ykysnk. One site, one page per package, and a Markdown file per
topic.

Live at <https://t2penbix99wcoxkv3a4g.github.io/VPM-Docs/>.

## Why a single site

The packages share a design and often depend on each other, so they share one site instead of one per package. A
package is a folder under `docs/` plus an entry in `site.config.mjs`; nothing in the site is tied to a specific
package name.

## Layout

```
docs/<project>/<language>/<Page>.md   the pages
site.config.mjs                       projects, their languages, groups and links
scripts/sync-content.mjs              generates src/generated/*.ts before dev/build
src/                                  React app (Vite, styled-components, Sass)
```

The page title is the `# Heading` of the Markdown file; the file name is the slug used in the URL
(`#/<project>/<slug>`).

## Add a page

1. Create `docs/<project>/<language>/My-Page.md` starting with `# My page`.
2. Add `"My-Page"` to one of the project's `groups` in `site.config.mjs` (the order there is the sidebar order).
3. Translate it by adding `docs/<project>/<other-language>/My-Page.md`; missing translations fall back to the default
   language and are marked in the index.

Links between pages are plain file names (`Installation`, `API#language-selection`); the app rewrites them to routes.

## Add a package

1. Add an entry to `projects` in `site.config.mjs` (`id`, `name`, `package`, `repository`, `releases`, `groups`).
2. Add `project.<id>.tagline` to every file in `src/i18n/`.
3. Create `docs/<id>/<default-language>/` and start writing.

Packages without documentation still appear on the home page; their page says so.

## Commands

```bash
npm install
npm run dev      # sync + vite dev server
npm run build    # sync + type-check + bundle into dist/
npm run preview  # serve dist/
```

`npm run sync` regenerates `src/generated/site.ts` (from `site.config.mjs`) and `src/generated/doc-dates.ts` (last
commit date per page, shown as "last updated").

## Deployment

`.github/workflows/pages.yml` builds on every push to `main` and deploys `dist/` to GitHub Pages. Enable Pages once
under **Settings > Pages > Build and deployment > Source: GitHub Actions**; `configure-pages` tries to enable it on
the first run as well.
