import type {KeyboardEvent as ReactKeyboardEvent, ReactNode} from "react";
import {isValidElement, useEffect, useMemo, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {site} from "./generated/site";
import {docDates} from "./generated/doc-dates";
import {countDocs, hasDoc, loadDoc, rewriteLinks, slugifyHeading} from "./docs";
import {detectLanguage, languages, translate} from "./i18n";
import {highlightParts, searchDocs} from "./search";
import {
    AppShell,
    Badge,
    Brand,
    Content,
    Controls,
    DocIndex,
    DocMeta,
    Footer,
    Hero,
    HeroActions,
    Icon,
    LanguageLabel,
    LanguageSelect,
    Layout,
    MarkdownBody,
    NavHome,
    NavLink,
    NavProjectBlock,
    NavProjectId,
    NavProjectLink,
    NavProjectName,
    NavProjectsLabel,
    NavSub,
    NavSubGroup,
    NavToggle,
    NavToggleLabel,
    Notice,
    ProjectCard,
    ProjectGrid,
    ProjectHead,
    ProjectHeadMeta,
    ProjectMeta,
    ProjectPackage,
    ProjectTagline,
    ProjectTitle,
    ScrollProgress,
    SearchBox,
    SearchClear,
    SearchEmpty,
    SearchInput,
    SearchResult,
    SearchResultProject,
    SearchResults,
    SearchResultSnippet,
    SearchResultTitle,
    Sidebar,
    Tagline,
    TopBar,
    TopNav,
    TopNavLink,
    VisuallyHidden,
} from "./App.styles";
import {ButtonLink} from "./styles/buttons";

type Route =
    | { name: "home" }
    | { name: "project"; project: string }
    | { name: "doc"; project: string; slug: string; anchor?: string };

function parseRoute(hash: string): Route {
    const path = hash.replace(/^#/, "");
    if (!path || path === "/") return {name: "home"};

    const doc = path.match(/^\/([^/]+)\/([^#/]+)(?:#(.+))?$/);
    if (doc) {
        return {
            name: "doc",
            project: decodeURIComponent(doc[1]),
            slug: decodeURIComponent(doc[2]),
            anchor: doc[3],
        };
    }

    const project = path.match(/^\/([^/]+)\/?$/);
    if (project) return {name: "project", project: decodeURIComponent(project[1])};

    return {name: "home"};
}

/** `?lang=ja` wins over the stored preference, so a language can be linked directly. */
function initialLanguage(): string {
    const requested = new URLSearchParams(window.location.search).get("lang")?.toLowerCase();
    if (requested) {
        const match = languages.find((language) => language.id.toLowerCase() === requested);
        if (match) return match.id;
    }
    return detectLanguage(localStorage.getItem("vpm-docs-language"), navigator.language);
}

/** `?q=term` opens the page with that search already filled in, so a search can be linked to. */
function initialQuery(): string {
    return new URLSearchParams(window.location.search).get("q") ?? "";
}

function toText(node: ReactNode): string {
    if (node === null || node === undefined || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(toText).join("");
    if (isValidElement<{ children?: ReactNode }>(node)) return toText(node.props.children);
    return "";
}

function slugify(text: string): string {
    return slugifyHeading(text);
}

/**
 * Heading ids come from the default language source (`anchorIds`), not from the rendered text, so `#some-heading`
 * links keep working when the heading is translated.
 */
function Markdown({source, project, anchorIds = []}: { source: string; project: string; anchorIds?: string[] }) {
    let headingIndex = 0;

    function heading(level: 1 | 2 | 3 | 4) {
        return function Heading({children}: { children?: ReactNode }) {
            const id = anchorIds[headingIndex++] ?? slugify(toText(children));
            const Tag = `h${level}` as const;
            return <Tag id={id}>{children}</Tag>;
        };
    }

    return (
        <MarkdownBody>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: heading(1),
                    h2: heading(2),
                    h3: heading(3),
                    h4: heading(4),
                    a({href, children}) {
                        const external = Boolean(href && /^https?:/i.test(href));
                        return (
                            <a
                                href={href}
                                {...(external ? {target: "_blank", rel: "noreferrer noopener"} : {})}
                            >
                                {children}
                            </a>
                        );
                    },
                }}
            >
                {rewriteLinks(source, project)}
            </ReactMarkdown>
        </MarkdownBody>
    );
}

export default function App() {
    const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));
    const [language, setLanguage] = useState(initialLanguage);
    const [navOpen, setNavOpen] = useState(false);
    const [query, setQuery] = useState(initialQuery);
    const [searchOpen, setSearchOpen] = useState(() => initialQuery().length > 0);
    const [activeIndex, setActiveIndex] = useState(0);

    const searchRef = useRef<HTMLInputElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const results = useMemo(() => searchDocs(query, language), [query, language]);

    useEffect(() => {
        const onHashChange = () => setRoute(parseRoute(window.location.hash));
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    // Ctrl/Cmd+K focuses the search field from anywhere on the page.
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                searchRef.current?.focus();
                setSearchOpen(true);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    useEffect(() => {
        localStorage.setItem("vpm-docs-language", language);
        document.documentElement.lang = language;
    }, [language]);

    // Written straight to the node: a scroll handler that re-renders the page would run on every frame.
    useEffect(() => {
        const update = () => {
            const bar = progressRef.current;
            if (!bar) return;
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const value = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
            bar.style.transform = `scaleX(${value})`;
        };

        update();
        window.addEventListener("scroll", update, {passive: true});
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [route]);

    useEffect(() => {
        setNavOpen(false);
        if (route.name === "doc" && route.anchor) {
            const target = document.getElementById(decodeURIComponent(route.anchor));
            if (target) {
                target.scrollIntoView({behavior: "smooth", block: "start"});
                return;
            }
        }
        window.scrollTo({top: 0, left: 0});
    }, [route]);

    const t = (key: string, vars?: Record<string, string>) => translate(language, key, vars);

    const current = route.name === "home" ? undefined : site.projects.find((item) => item.id === route.project);
    const groups = current
        ? current.groups
            .map((group) => ({
                id: group.id,
                docs: group.docs.filter((slug) => hasDoc(current.id, slug, language)),
            }))
            .filter((group) => group.docs.length > 0)
        : [];

    const firstDocumented = site.projects.find((item) => countDocs(item.id, language) > 0) ?? site.projects[0];

    const openHit = (project: string, slug: string) => {
        window.location.hash = `#/${project}/${encodeURIComponent(slug)}`;
        setSearchOpen(false);
        setQuery("");
        searchRef.current?.blur();
    };

    const clearSearch = () => {
        setQuery("");
        setActiveIndex(0);
        searchRef.current?.focus();
    };

    const onSearchKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((index) => Math.min(index + 1, Math.max(0, results.length - 1)));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
        } else if (event.key === "Enter") {
            const hit = results[activeIndex];
            if (hit) openHit(hit.project, hit.slug);
        } else if (event.key === "Escape") {
            event.preventDefault();
            setSearchOpen(false);
            searchRef.current?.blur();
        }
    };

    return (
        <AppShell>
            <TopBar>
                <ScrollProgress ref={progressRef} aria-hidden="true"/>

                <Brand href="#/">
                    <Icon $glyph="package" aria-hidden="true"/>
                    <span>{site.name}</span>
                </Brand>

                <SearchBox
                    onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                            setSearchOpen(false);
                        }
                    }}
                >
                    <Icon $glyph="search" aria-hidden="true"/>
                    <SearchInput
                        ref={searchRef}
                        type="text"
                        value={query}
                        placeholder={t("search.placeholder")}
                        aria-label={t("search.placeholder")}
                        autoComplete="off"
                        spellCheck={false}
                        role="combobox"
                        aria-expanded={searchOpen && query.length > 0}
                        aria-controls="vpm-search-results"
                        aria-autocomplete="list"
                        onFocus={() => setSearchOpen(true)}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setActiveIndex(0);
                            setSearchOpen(true);
                        }}
                        onKeyDown={onSearchKeyDown}
                    />
                    {query ? (
                        <SearchClear type="button" onClick={clearSearch} aria-label={t("search.clear")}>
                            <Icon $glyph="close" aria-hidden="true"/>
                        </SearchClear>
                    ) : null}

                    {searchOpen && query ? (
                        <SearchResults id="vpm-search-results" role="listbox">
                            {results.length ? (
                                results.map((hit, index) => (
                                    <SearchResult
                                        key={`${hit.project}/${hit.slug}`}
                                        type="button"
                                        role="option"
                                        aria-selected={index === activeIndex}
                                        $active={index === activeIndex}
                                        onMouseDown={(event) => event.preventDefault()}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        onClick={() => openHit(hit.project, hit.slug)}
                                    >
                                        <SearchResultTitle>
                                            {hit.title}
                                            <SearchResultProject>{hit.projectName}</SearchResultProject>
                                        </SearchResultTitle>
                                        <SearchResultSnippet>
                                            {highlightParts(hit.snippet, query).map((part, partIndex) =>
                                                part.match ? (
                                                    <mark key={partIndex}>{part.text}</mark>
                                                ) : (
                                                    <span key={partIndex}>{part.text}</span>
                                                ),
                                            )}
                                        </SearchResultSnippet>
                                    </SearchResult>
                                ))
                            ) : (
                                <SearchEmpty>{t("search.noResults")}</SearchEmpty>
                            )}
                        </SearchResults>
                    ) : null}
                </SearchBox>

                <TopNav>
                    <TopNavLink href={site.repository} target="_blank" rel="noreferrer noopener">
                        <Icon $glyph="github" aria-hidden="true"/>
                        {t("nav.github")}
                    </TopNavLink>
                </TopNav>

                <Controls>
                    <LanguageLabel>
                        <Icon $glyph="language" aria-hidden="true"/>
                        <VisuallyHidden>{t("language.label")}</VisuallyHidden>
                        <LanguageSelect
                            value={language}
                            onChange={(event) => setLanguage(event.target.value)}
                        >
                            {languages.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.label}
                                </option>
                            ))}
                        </LanguageSelect>
                    </LanguageLabel>

                    <NavToggle
                        type="button"
                        onClick={() => setNavOpen((open) => !open)}
                        aria-expanded={navOpen}
                        aria-label={t("nav.menu")}
                    >
                        <Icon $glyph="menu" aria-hidden="true"/>
                        <NavToggleLabel>{t("nav.menu")}</NavToggleLabel>
                    </NavToggle>
                </Controls>
            </TopBar>

            <Layout>
                <Sidebar $open={navOpen}>
                    <NavHome href="#/" $active={route.name === "home"}>
                        <Icon $glyph="home" aria-hidden="true"/>
                        {t("nav.home")}
                    </NavHome>

                    <NavProjectsLabel>{t("nav.projects")}</NavProjectsLabel>

                    {site.projects.map((item) => {
                        const isCurrent = current?.id === item.id;
                        return (
                            <NavProjectBlock key={item.id}>
                                <NavProjectLink href={`#/${item.id}`} $active={isCurrent}>
                                    <Icon $glyph="package" aria-hidden="true"/>
                                    <NavProjectName>
                                        {item.name}
                                        <NavProjectId>{item.package}</NavProjectId>
                                    </NavProjectName>
                                </NavProjectLink>

                                {isCurrent && groups.length > 0 ? (
                                    <NavSub>
                                        {groups.map((group) => (
                                            <NavSubGroup key={group.id}>
                                                <h3>{t(`group.${group.id}`)}</h3>
                                                <ul>
                                                    {group.docs.map((slug) => {
                                                        const entry = loadDoc(item.id, slug, language);
                                                        const active =
                                                            route.name === "doc" &&
                                                            route.project === item.id &&
                                                            route.slug === slug;
                                                        return (
                                                            <li key={slug}>
                                                                <NavLink
                                                                    href={`#/${item.id}/${encodeURIComponent(slug)}`}
                                                                    $active={active}
                                                                >
                                                                    {entry?.title ?? slug}
                                                                </NavLink>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </NavSubGroup>
                                        ))}
                                    </NavSub>
                                ) : null}
                            </NavProjectBlock>
                        );
                    })}
                </Sidebar>

                <Content>{renderRoute()}</Content>
            </Layout>

            <Footer>
                <span>{t("footer.note")}</span>
                <nav>
                    <a href={site.repository} target="_blank" rel="noreferrer noopener">
                        {t("footer.source")}
                    </a>
                    <span>{t("footer.license")}</span>
                </nav>
            </Footer>
        </AppShell>
    );

    function renderRoute() {
        if (route.name === "home") {
            return (
                <>
                    <Hero>
                        <h1>{site.name}</h1>
                        <Tagline>{site.tagline}</Tagline>
                        <HeroActions>
                            <ButtonLink $primary href={`#/${firstDocumented.id}`}>
                                <Icon $glyph="docs" aria-hidden="true"/>
                                {t("nav.docs")}
                            </ButtonLink>
                            <ButtonLink href={site.repository} target="_blank" rel="noreferrer noopener">
                                <Icon $glyph="github" aria-hidden="true"/>
                                {t("nav.github")}
                            </ButtonLink>
                        </HeroActions>
                    </Hero>

                    <p>{t("home.intro")}</p>

                    <ProjectGrid>
                        {site.projects.map((item) => (
                            <ProjectCard key={item.id} href={`#/${item.id}`}>
                                <ProjectTitle>
                                    <Icon $glyph="package" aria-hidden="true"/>
                                    {item.name}
                                </ProjectTitle>
                                <ProjectPackage>{item.package}</ProjectPackage>
                                <ProjectTagline>{t(`project.${item.id}.tagline`)}</ProjectTagline>
                                <ProjectMeta>
                                    <Icon $glyph="docs" aria-hidden="true"/>
                                    {countDocs(item.id, language)} {t("project.docs")}
                                </ProjectMeta>
                            </ProjectCard>
                        ))}
                    </ProjectGrid>
                </>
            );
        }

        if (route.name === "project") {
            if (!current) {
                return (
                    <>
                        <h1>{t("docs.notFound")}</h1>
                        <p>
                            <a href="#/">{t("docs.backHome")}</a>
                        </p>
                    </>
                );
            }

            return (
                <>
                    <ProjectHead>
                        <h1>{current.name}</h1>
                        <ProjectPackage>{current.package}</ProjectPackage>
                        <ProjectHeadMeta>
                            <a href={current.repository} target="_blank" rel="noreferrer noopener">
                                <Icon $glyph="github" aria-hidden="true"/> GitHub
                            </a>
                            <a href={current.releases} target="_blank" rel="noreferrer noopener">
                                <Icon $glyph="releases" aria-hidden="true"/> {t("nav.releases")}
                            </a>
                        </ProjectHeadMeta>
                    </ProjectHead>

                    {groups.length === 0 ? (
                        <Notice>{t("project.noDocs")}</Notice>
                    ) : (
                        groups.map((group) => (
                            <DocIndex key={group.id}>
                                <h2>{t(`group.${group.id}`)}</h2>
                                <ul>
                                    {group.docs.map((slug) => {
                                        const entry = loadDoc(current.id, slug, language);
                                        return (
                                            <li key={slug}>
                                                <a href={`#/${current.id}/${encodeURIComponent(slug)}`}>
                                                    {entry?.title ?? slug}
                                                </a>
                                                {!entry?.translated && language !== site.defaultLanguage ? (
                                                    <Badge>{site.defaultLanguage}</Badge>
                                                ) : null}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </DocIndex>
                        ))
                    )}
                </>
            );
        }

        if (!current) {
            return (
                <>
                    <h1>{t("docs.notFound")}</h1>
                    <p>
                        <a href="#/">{t("docs.backHome")}</a>
                    </p>
                </>
            );
        }

        const entry = loadDoc(current.id, route.slug, language);
        if (!entry) {
            return (
                <>
                    <h1>{t("docs.notFound")}</h1>
                    <p>
                        <a href={`#/${current.id}`}>{t("docs.backHome")}</a>
                    </p>
                </>
            );
        }

        const updated =
            docDates[`${current.id}/${language}/${entry.slug}`] ??
            docDates[`${current.id}/${site.defaultLanguage}/${entry.slug}`];

        return (
            <>
                {!entry.translated && language !== site.defaultLanguage ? (
                    <Notice>{t("docs.untranslated")}</Notice>
                ) : null}
                <Markdown source={entry.markdown} project={current.id} anchorIds={entry.anchorIds}/>
                {updated ? <DocMeta>{t("docs.lastUpdated", {date: updated})}</DocMeta> : null}
            </>
        );
    }
}
