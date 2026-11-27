// Writes the pages that are not written by hand:
//
//   docs/index.md                       -> redirect to the default language
//   docs/<language>/index.md            -> home page: hero from site.config + one feature per package
//   docs/<language>/<package>/index.md  -> the package's pages, grouped like the sidebar
//
// Every title comes from the target page's own H1, so a page is still described in one place only.
// Run automatically by `docs:dev` and `docs:build`; the output is in .gitignore.
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";

import {site} from "../site.config.mjs";
import {labels} from "../docs/.vitepress/labels.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const docsRoot = resolve(here, "..", "docs");
const base = new URL(site.url).pathname;
const prefixOf = (language) => `/${language}`;

/** Quotes a value for the YAML frontmatter; JSON strings are valid YAML. */
const yaml = (text) => JSON.stringify(text);

/** Sidebar text and page titles come from the page heading, never from the config. */
function titleOf(language, project, slug) {
    const path = join(docsRoot, prefixOf(language), project.id, `${slug}.md`);
    if (!existsSync(path)) return slug;

    const heading = readFileSync(path, "utf8").split("\n").find((line) => /^#\s+\S/.test(line));
    return heading ? heading.replace(/^#\s+/, "").trim() : slug;
}

/** Pages of a group that exist in this language, as sidebar-like bullet points. */
function links(language, project, group) {
    return group.docs
        .filter((slug) => existsSync(join(docsRoot, prefixOf(language), project.id, `${slug}.md`)))
        .map((slug) => `- [${titleOf(language, project, slug)}](./${slug}.md)`);
}

/** `/VPM-Docs/en-US/` for the default language, which is where the site root sends the reader. */
function rootRedirect() {
    const target = `${base}${site.defaultLanguage}/`;
    const others = site.languages
        .filter((language) => language !== site.defaultLanguage)
        .map((language) => `[${labels[language].language}](${prefixOf(language)}/)`)
        .join(", ");

    return `---
layout: false
lastUpdated: false
head:
  - - meta
    - http-equiv: refresh
      content: 0; url=${target}
---

# ${site.name}

The documentation opens in [${labels[site.defaultLanguage].language}](${prefixOf(site.defaultLanguage)}/).
${others ? `Other languages: ${others}.` : ""}
`;
}

/** The landing page of one language: the theme's home layout, filled from `site.config.mjs`. */
function home(language) {
    const text = labels[language].home;
    const [first] = site.projects;
    const features = site.projects
        .map(
            (project) => `  - title: ${yaml(project.name)}
    details: ${yaml(text.features[project.id] ?? project.name)}
    link: ${yaml(`${prefixOf(language)}/${project.id}/`)}`,
        )
        .join("\n");

    return `---
layout: home
lastUpdated: false
hero:
  image:
    src: "/logo.svg"
    alt: ${yaml(site.name)}
  name: ${yaml(site.name)}
  tagline: ${yaml(text.tagline)}
  actions:
    - theme: brand
      text: ${yaml(text.action)}
      link: ${yaml(`${prefixOf(language)}/${first.id}/`)}
    - theme: alt
      text: "GitHub"
      link: ${yaml(site.repository)}
features:
${features}
---
`;
}

/** The front page of a package: its own pages, in the order and groups the sidebar uses. */
function packageIndex(language, project) {
    const lines = [
        "---",
        // These pages are generated, so git has no commit date for them.
        "lastUpdated: false",
        "---",
        "",
        `# ${project.name}`,
        "",
        `\`${project.package}\` · [GitHub](${project.repository}) · [Releases](${project.releases})`,
        "",
    ];

    const note = labels[language].home.notes?.[project.id];
    if (note) lines.push(note, "");

    for (const group of project.groups) {
        const items = links(language, project, group);
        if (items.length === 0) continue;
        lines.push(`## ${labels[language].group[group.id] ?? group.id}`, "", ...items, "");
    }

    return `${lines.join("\n").trimEnd()}\n`;
}

mkdirSync(docsRoot, {recursive: true});
writeFileSync(join(docsRoot, "index.md"), rootRedirect(), "utf8");

let count = 1;
for (const language of site.languages) {
    const directory = join(docsRoot, prefixOf(language));
    writeFileSync(join(directory, "index.md"), home(language), "utf8");
    count++;

    for (const project of site.projects) {
        const projectDirectory = join(directory, project.id);
        mkdirSync(projectDirectory, {recursive: true});
        writeFileSync(join(projectDirectory, "index.md"), packageIndex(language, project), "utf8");
        count++;
    }
}

console.log(`prepared ${count} index pages`);
