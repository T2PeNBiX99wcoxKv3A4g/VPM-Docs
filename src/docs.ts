import {site} from "./generated/site";

export type DocEntry = {
    project: string;
    slug: string;
    title: string;
    markdown: string;
    /** False when the page is shown from the default language because this one has no file. */
    translated: boolean;
    /** Heading ids taken from the default language source, so anchors work in every translation. */
    anchorIds: string[];
};

/** Markdown files under docs/<project>/<language>/<slug>.md. */
const rawDocs = import.meta.glob("../docs/*/*/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

const docs = new Map<string, string>();
for (const [path, markdown] of Object.entries(rawDocs)) {
    const match = path.match(/\/docs\/([^/]+)\/([^/]+)\/(.+)\.md$/);
    if (!match) continue;
    docs.set(`${match[1]}/${match[2]}/${match[3]}`, markdown);
}

function titleOf(markdown: string, fallback: string): string {
    const heading = markdown.split("\n").find((line) => /^#\s+\S/.test(line));
    return heading ? heading.replace(/^#\s+/, "").trim() : fallback;
}

export function slugifyHeading(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-");
}

/** Ids for every rendered heading (h1-h4) in document order, used as link anchors. */
function headingIds(markdown: string): string[] {
    return markdown
        .split("\n")
        .filter((line) => /^#{1,4}\s+\S/.test(line))
        .map((line) => slugifyHeading(line.replace(/^#{1,4}\s+/, "")));
}

/** Pages that exist for the given language, falling back to the site's default language. */
export function loadDoc(project: string, slug: string, language: string): DocEntry | null {
    const localised = docs.get(`${project}/${language}/${slug}`);
    const fallback = docs.get(`${project}/${site.defaultLanguage}/${slug}`);
    const source = localised ?? fallback;
    if (!source) return null;

    return {
        project,
        slug,
        title: titleOf(source, slug),
        markdown: stripTrailingRule(source),
        translated: localised !== undefined,
        // Always taken from the default language: translations render the same anchors, so `#some-heading` links
        // keep working after the headings are translated.
        anchorIds: headingIds(fallback ?? source),
    };
}

/**
 * Drop a horizontal rule at the very end of a page. Some pages end with `---` and the site draws its own separator
 * above the "last updated" line, which would otherwise show as two rules.
 */
function stripTrailingRule(markdown: string): string {
    const lines = markdown.split("\n");

    while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

    if (lines.length && /^(-{3,}|\*{3,}|_{3,})$/.test(lines[lines.length - 1].trim())) {
        lines.pop();
        while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
    }

    return lines.join("\n");
}

export function hasDoc(project: string, slug: string, language: string): boolean {
    return docs.has(`${project}/${language}/${slug}`) || docs.has(`${project}/${site.defaultLanguage}/${slug}`);
}

/** How many pages a project has in the given language (falling back to the default one). */
export function countDocs(project: string, language: string): number {
    const seen = new Set<string>();
    for (const key of docs.keys()) {
        const [id, lang, slug] = key.split("/");
        if (id !== project) continue;
        if (lang !== language && lang !== site.defaultLanguage) continue;
        seen.add(slug);
    }
    return seen.size;
}

/**
 * Page links inside the markdown are bare names (`Installation`, `API#section`). Rewrite them to routes of the same
 * project and leave external links, anchors and images alone.
 */
export function rewriteLinks(markdown: string, project: string): string {
    return markdown.replace(/(?<!!)\]\(([^)\s]+)\)/g, (whole, href: string) => {
        if (/^(?:[a-z]+:|\/|#)/i.test(href)) return whole;

        const [page, anchor] = href.split("#");
        const slug = page.replace(/\.md$/i, "");
        if (!slug) return whole;

        return `](#/${project}/${encodeURIComponent(slug)}${anchor ? `#${anchor}` : ""})`;
    });
}
