import {loadDoc} from "./docs";
import {site} from "./generated/site";

export type SearchHit = {
    project: string;
    projectName: string;
    slug: string;
    title: string;
    snippet: string;
    score: number;
};

const MAX_RESULTS = 10;
const SNIPPET_BEFORE = 40;
const SNIPPET_AFTER = 90;

/** Markdown -> searchable text. Keeps the words, drops the syntax. */
function plainText(markdown: string): string {
    return markdown
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`[^`]*`/g, " ")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/^[-*+]\s+/gm, "")
        .replace(/^\s*>\s?/gm, "")
        .replace(/[*_~|]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

type CachedDoc = { text: string; normalised: string };

// The markdown never changes while the page is open, so each page is flattened once.
const cache = new Map<string, CachedDoc>();

function flatten(project: string, slug: string, language: string, markdown: string): CachedDoc {
    const key = `${project}/${language}/${slug}`;
    const hit = cache.get(key);
    if (hit) return hit;

    const text = plainText(markdown);
    const entry = {text, normalised: text.toLowerCase().normalize("NFKC")};
    cache.set(key, entry);
    return entry;
}

function countOccurrences(haystack: string, needle: string): number {
    let count = 0;
    let index = haystack.indexOf(needle);
    while (index !== -1) {
        count += 1;
        index = haystack.indexOf(needle, index + needle.length);
    }
    return count;
}

function snippetAround(text: string, terms: string[]): string {
    const lower = text.toLowerCase().normalize("NFKC");
    let index = -1;
    for (const term of terms) {
        const found = lower.indexOf(term);
        if (found !== -1 && (index === -1 || found < index)) index = found;
    }
    if (index === -1) index = 0;

    const start = Math.max(0, index - SNIPPET_BEFORE);
    const end = Math.min(text.length, index + SNIPPET_AFTER);
    return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
}

/** Pages of every package (current language, falling back to English) that contain all search terms. */
export function searchDocs(query: string, language: string): SearchHit[] {
    const terms = query
        .toLowerCase()
        .normalize("NFKC")
        .split(/\s+/)
        .filter(Boolean);

    if (terms.length === 0) return [];

    const hits: SearchHit[] = [];

    for (const project of site.projects) {
        for (const group of project.groups) {
            for (const slug of group.docs) {
                const entry = loadDoc(project.id, slug, language);
                if (!entry) continue;

                const page = flatten(project.id, slug, language, entry.markdown);
                if (!terms.every((term) => page.normalised.includes(term))) continue;

                const title = entry.title.toLowerCase().normalize("NFKC");
                const packageName = project.name.toLowerCase().normalize("NFKC");
                let score = 0;
                for (const term of terms) {
                    if (title.includes(term)) score += 20;
                    if (packageName.includes(term)) score += 5;
                    score += Math.min(6, countOccurrences(page.normalised, term));
                }

                hits.push({
                    project: project.id,
                    projectName: project.name,
                    slug,
                    title: entry.title,
                    snippet: snippetAround(page.text, terms),
                    score,
                });
            }
        }
    }

    return hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, MAX_RESULTS);
}

export type TextPart = { text: string; match: boolean };

/** Split a snippet into plain and matched parts so the query can be marked. */
export function highlightParts(text: string, query: string): TextPart[] {
    const terms = query
        .toLowerCase()
        .normalize("NFKC")
        .split(/\s+/)
        .filter(Boolean);

    const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (escaped.length === 0) return [{text, match: false}];

    // Comparison happens on the normalised form, so match offsets are computed there and applied to the original
    // string; NFKC does not change ASCII or common CJK lengths.
    const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts: TextPart[] = [];
    let last = 0;

    for (const found of text.matchAll(pattern)) {
        const index = found.index ?? 0;
        if (index > last) parts.push({text: text.slice(last, index), match: false});
        parts.push({text: found[0], match: true});
        last = index + found[0].length;
    }

    if (last < text.length) parts.push({text: text.slice(last), match: false});
    return parts;
}
