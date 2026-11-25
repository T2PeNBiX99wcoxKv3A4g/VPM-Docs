import {isValidElement, useEffect, useState} from "react";
import type {ReactNode} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {site} from "./generated/site";
import {docDates} from "./generated/doc-dates";
import {countDocs, hasDoc, loadDoc, rewriteLinks, slugifyHeading} from "./docs";
import {detectLanguage, languages, translate} from "./i18n";
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
    NavGroup,
    NavHome,
    NavLink,
    NavToggle,
    Notice,
    ProjectCard,
    ProjectGrid,
    ProjectHead,
    ProjectHeadMeta,
    ProjectMeta,
    ProjectPackage,
    ProjectTagline,
    ProjectTitle,
    Sidebar,
    Tagline,
    TopBar,
    TopNav,
    TopNavLink,
    VisuallyHidden,
} from "./App.styles";
import {ButtonLink} from "./styles/buttons";

type Route =
    | {name: "home"}
    | {name: "project"; project: string}
    | {name: "doc"; project: string; slug: string; anchor?: string};

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

function toText(node: ReactNode): string {
    if (node === null || node === undefined || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(toText).join("");
    if (isValidElement<{children?: ReactNode}>(node)) return toText(node.props.children);
    return "";
}

function slugify(text: string): string {
    return slugifyHeading(text);
}

/**
 * Heading ids come from the default language source (`anchorIds`), not from the rendered text, so `#some-heading`
 * links keep working when the heading is translated.
 */
function Markdown({source, project, anchorIds = []}: {source: string; project: string; anchorIds?: string[]}) {
    let headingIndex = 0;

    function heading(level: 1 | 2 | 3 | 4) {
        return function Heading({children}: {children?: ReactNode}) {
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

    useEffect(() => {
        const onHashChange = () => setRoute(parseRoute(window.location.hash));
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    useEffect(() => {
        localStorage.setItem("vpm-docs-language", language);
        document.documentElement.lang = language;
    }, [language]);

    useEffect(() => {
        setNavOpen(false);
        if (route.name === "doc" && route.anchor) {
            const target = document.getElementById(decodeURIComponent(route.anchor));
            if (target) {
                target.scrollIntoView();
                return;
            }
        }
        window.scrollTo(0, 0);
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

    return (
        <AppShell>
            <TopBar>
                <Brand href="#/">
                    <Icon $glyph="package" aria-hidden="true"/>
                    <span>{site.name}</span>
                </Brand>

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
                    >
                        <Icon $glyph="menu" aria-hidden="true"/>
                        {t("nav.menu")}
                    </NavToggle>
                </Controls>
            </TopBar>

            <Layout>
                <Sidebar $open={navOpen}>
                    <NavHome href="#/" $active={route.name === "home"}>
                        <Icon $glyph="home" aria-hidden="true"/>
                        {t("nav.home")}
                    </NavHome>

                    <NavGroup>
                        <h2>{t("nav.projects")}</h2>
                        <ul>
                            {site.projects.map((item) => (
                                <li key={item.id}>
                                    <NavLink
                                        href={`#/${item.id}`}
                                        $active={current?.id === item.id}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </NavGroup>

                    {groups.map((group) => (
                        <NavGroup key={group.id}>
                            <h2>{t(`group.${group.id}`)}</h2>
                            <ul>
                                {group.docs.map((slug) => {
                                    const entry = current ? loadDoc(current.id, slug, language) : null;
                                    const active = route.name === "doc" && route.project === current?.id && route.slug === slug;
                                    return (
                                        <li key={slug}>
                                            <NavLink
                                                href={`#/${current?.id}/${encodeURIComponent(slug)}`}
                                                $active={active}
                                            >
                                                {entry?.title ?? slug}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </NavGroup>
                    ))}
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
                <Markdown source={entry.markdown} project={current.id} anchorIds={entry.anchorIds} />
                {updated ? <DocMeta>{t("docs.lastUpdated", {date: updated})}</DocMeta> : null}
            </>
        );
    }
}
