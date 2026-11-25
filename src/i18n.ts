import en from "./i18n/en.json";
import ja from "./i18n/ja.json";
import zhCN from "./i18n/zh-CN.json";
import zhTW from "./i18n/zh-TW.json";

// Must match the languages the packages ship translations for, so the site and the editor offer the same set.
const copy: Record<string, Record<string, string>> = {
    en,
    ja,
    "zh-CN": zhCN,
    "zh-TW": zhTW,
};

export type Language = {id: string; label: string};

export const languages: Language[] = [
    {id: "en", label: "English"},
    {id: "ja", label: "日本語"},
    {id: "zh-CN", label: "简体中文"},
    {id: "zh-TW", label: "繁體中文"},
];

/** Site text for the given language, falling back to English per key. */
export function translate(language: string, key: string, vars?: Record<string, string>): string {
    let text = copy[language]?.[key] ?? en[key as keyof typeof en] ?? key;
    for (const [name, value] of Object.entries(vars ?? {})) {
        text = text.replaceAll(`{${name}}`, value);
    }
    return text;
}

export function detectLanguage(stored: string | null, browser: string): string {
    const available = languages.map((language) => language.id);
    if (stored && available.includes(stored)) return stored;

    for (const candidate of [browser, browser.split("-")[0]]) {
        const match = available.find((id) => id.toLowerCase() === candidate.toLowerCase());
        if (match) return match;
    }
    return "en";
}
