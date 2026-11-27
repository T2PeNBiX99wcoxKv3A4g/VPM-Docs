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

/** The default language is the site root, the other ones live in their own folder. */
const prefixOf = (language) => (language === defaultLanguage ? "" : `/${language}`);

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
    return {
        nav: nav(language),
        sidebar: sidebar(language),
        footer: labels[language].footer,
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
    themeConfig: {
        outline: {level: [2, 3]},
        search: {provider: "local"},
        ...languageConfig(defaultLanguage),
    },
    locales: Object.fromEntries(
        site.languages.map((language) => [
            language === defaultLanguage ? "root" : language,
            {
                label: labels[language].language,
                lang: language,
                ...(language === defaultLanguage ? {} : {themeConfig: languageConfig(language)}),
            },
        ]),
    ),
});
