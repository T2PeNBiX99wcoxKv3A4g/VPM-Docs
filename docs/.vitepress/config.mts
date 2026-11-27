import {existsSync, readFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {defineConfig} from "vitepress";

import {site} from "../../site.config.mjs";
import {labels} from "./labels.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const docsRoot = resolve(here, "..");

/** Served from a project page: https://<user>.github.io/VPM-Docs/ */
const base = "/VPM-Docs/";
const defaultLanguage = site.defaultLanguage;

/** Every language has its own folder; the site root only redirects to the default one. */
const prefixOf = (language) => `/${language}`;

/**
 * Addresses without a language (`/utils/`, `/localization/Installation`) send the reader to the default language.
 * The development server answers them with a redirect and the build writes the same redirect as a small page, so a
 * link that was written before the languages had their own folder still lands somewhere useful.
 */
function defaultLanguageRedirects() {
    const prefix = prefixOf(defaultLanguage);

    // Pages keep the .html suffix the site uses, so the redirect lands on the real file instead of a missing page.
    const redirects = [
        ...site.projects.map((project) => ({from: `/${project.id}/`, to: `${prefix}/${project.id}/`})),
        ...site.projects.flatMap((project) =>
            project.groups.flatMap((group) =>
                group.docs.map((slug) => ({from: `/${project.id}/${slug}`, to: `${prefix}/${project.id}/${slug}.html`}))),
        ),
    ];

    const page = (target) =>
        `<!DOCTYPE html><html lang="${defaultLanguage}"><head><meta charset="utf-8">` +
        `<title>${site.name}</title><link rel="canonical" href="${target}">` +
        `<meta http-equiv="refresh" content="0; url=${target}"></head>` +
        `<body><p><a href="${target}">${target}</a></p></body></html>`;

    const withoutSlash = (path) => path.replace(/\/+$/, "");
    const find = (path) => redirects.find((entry) => withoutSlash(entry.from) === withoutSlash(path));

    return {
        name: "vpm-docs-default-language-redirects",

        configureServer(server) {
            server.middlewares.use((request, response, next) => {
                const url = request.url ?? "/";
                if (!url.startsWith(base)) return next();

                const [path, query] = url.slice(base.length).split("?");
                const target = find(path);
                if (!target) return next();

                response.writeHead(302, {
                    location: `${base}${target.to.replace(/^\//, "")}${query ? `?${query}` : ""}`,
                });
                response.end();
            });
        },

        generateBundle() {
            for (const {from, to} of redirects) {
                this.emitFile({
                    type: "asset",
                    fileName: `${from.replace(/^\//, "")}${from.endsWith("/") ? "" : "/"}index.html`,
                    source: page(`${base}${to.replace(/^\//, "")}`),
                });
            }
        },
    };
}

/** Sidebar text comes from the page heading, so a page is written once and its title is not repeated here. */
function titleOf(language, project, slug) {
    const path = join(docsRoot, prefixOf(language), project, `${slug}.md`);
    if (!existsSync(path)) return slug;

    const heading = readFileSync(path, "utf8").split("\n").find((line) => /^#\s+\S/.test(line));
    return heading ? heading.replace(/^#\s+/, "").trim() : slug;
}

/** One sidebar block per package, with the groups listed in `site.config.mjs`. */
function sidebar(language) {
    const result = {};
    const groupLabels = labels[language].group;

    for (const project of site.projects) {
        const key = `${prefixOf(language)}/${project.id}/`;
        const groups = [];

        for (const group of project.groups) {
            const items = group.docs
                .filter((slug) => existsSync(join(docsRoot, prefixOf(language), project.id, `${slug}.md`)))
                .map((slug) => ({text: titleOf(language, project.id, slug), link: `${key}${slug}`}));

            if (items.length > 0) groups.push({text: groupLabels[group.id] ?? group.id, collapsed: false, items});
        }

        if (groups.length > 0) result[key] = groups;
    }

    return result;
}

function nav(language) {
    return [
        {
            text: labels[language].nav.packages,
            items: site.projects.map((project) => ({
                text: project.name,
                link: `${prefixOf(language)}/${project.id}/`,
            })),
        },
        {text: labels[language].nav.github, link: site.repository},
    ];
}

function languageConfig(language) {
    const theme = labels[language].theme;

    return {
        nav: nav(language),
        sidebar: sidebar(language),
        footer: labels[language].footer,
        // The outline keeps the same depth in every language; only its caption is translated.
        outline: {level: [2, 3], ...(theme.outline ?? {})},
        docFooter: theme.docFooter,
        lastUpdated: theme.lastUpdated,
        darkModeSwitchLabel: theme.darkModeSwitchLabel,
        sidebarMenuLabel: theme.sidebarMenuLabel,
        returnToTopLabel: theme.returnToTopLabel,
        langMenuLabel: theme.langMenuLabel,
        search: {provider: "local", options: {translations: theme.search}},
    };
}

export default defineConfig({
    base,
    title: site.name,
    description: site.description,
    // "Last updated" comes from the commit that touched the page; the deploy workflow checks out the full history.
    lastUpdated: true,
    cleanUrls: false,
    head: [["link", {rel: "icon", type: "image/svg+xml", href: `${base}favicon.svg`}]],
    vite: {
        plugins: [defaultLanguageRedirects()],
    },
    themeConfig: {
        ...languageConfig(defaultLanguage),
    },
    locales: Object.fromEntries(
        site.languages.map((language) => [
            language,
            {
                label: labels[language].language,
                lang: language,
                themeConfig: languageConfig(language),
            },
        ]),
    ),
});
