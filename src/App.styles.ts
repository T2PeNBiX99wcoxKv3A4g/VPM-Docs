import { css, styled } from "styled-components";

import docsIcon from "./icons/docs.svg";
import githubIcon from "./icons/github.svg";
import homeIcon from "./icons/home.svg";
import languageIcon from "./icons/language.svg";
import menuIcon from "./icons/menu.svg";
import packageIcon from "./icons/package.svg";
import releasesIcon from "./icons/releases.svg";
import { mobile } from "./styles/media";

/** Every icon file, keyed by the name used at the call site. */
const glyphs = {
    docs: docsIcon,
    github: githubIcon,
    home: homeIcon,
    language: languageIcon,
    menu: menuIcon,
    package: packageIcon,
    releases: releasesIcon,
};

/**
 * Inline icon. The file stays a real .svg asset and is used as a mask, so the icon takes the colour of the text
 * around it instead of its own fill.
 */
export const Icon = styled.span<{ $glyph: keyof typeof glyphs }>`
    display: inline-block;
    width: 1.05em;
    height: 1.05em;
    flex: none;
    vertical-align: -0.15em;
    background-color: currentColor;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-image: url(${props => glyphs[props.$glyph]});
    mask-image: url(${props => glyphs[props.$glyph]});
`;

/** Text for screen readers only (the language selector has no visible label). */
export const VisuallyHidden = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
`;

export const AppShell = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

/* --- top bar ------------------------------------------------------------- */

export const TopBar = styled.header`
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--topbar);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
`;

export const Brand = styled.a`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-strong);
    font-weight: 700;
    font-size: 1.05rem;

    &:hover {
        text-decoration: none;
    }
`;

export const TopNav = styled.nav`
    display: flex;
    gap: 1.1rem;
    font-size: 0.92rem;

    @media ${mobile} {
        display: none;
    }
`;

export const TopNavLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text);

    &:hover {
        color: var(--accent-strong);
    }
`;

export const Controls = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.6rem;
`;

export const LanguageLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-muted);
`;

export const LanguageSelect = styled.select`
    padding: 0.35rem 0.5rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-size: 0.85rem;
`;

export const NavToggle = styled.button`
    display: none;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.7rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-size: 0.85rem;
    cursor: pointer;

    @media ${mobile} {
        display: inline-flex;
    }
`;

/* --- layout -------------------------------------------------------------- */

export const Layout = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: 16rem minmax(0, 1fr);
    gap: 2rem;
    width: 100%;
    max-width: 78rem;
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;

    @media ${mobile} {
        grid-template-columns: minmax(0, 1fr);
        padding: 1.25rem 1rem 2rem;
    }
`;

export const Sidebar = styled.aside<{ $open?: boolean }>`
    position: sticky;
    top: 4.5rem;
    align-self: start;
    max-height: calc(100vh - 6rem);
    overflow-y: auto;
    font-size: 0.9rem;

    @media ${mobile} {
        display: none;
        position: static;
        max-height: none;

        ${props =>
            props.$open &&
            css`
                display: block;
            `}
    }
`;

export const NavHome = styled.a<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 1.4rem;
    padding: 0.35rem 0.55rem;
    border-radius: var(--radius-sm);
    border-left: 2px solid transparent;
    color: var(--text);
    font-weight: 600;

    &:hover {
        background: var(--surface);
        text-decoration: none;
    }

    ${props =>
        props.$active &&
        css`
            border-left-color: var(--accent);
            background: var(--surface);
            color: var(--accent-strong);
        `}
`;

export const NavGroup = styled.section`
    & + & {
        margin-top: 1.6rem;
    }

    h2 {
        margin: 0 0 0.5rem;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text-muted);
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        margin: 0.15rem 0;
    }
`;

export const NavLink = styled.a<{ $active?: boolean }>`
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
    padding: 0.3rem 0.55rem;
    border-radius: var(--radius-sm);
    border-left: 2px solid transparent;
    color: var(--text);

    &:hover {
        background: var(--surface);
        text-decoration: none;
    }

    ${props =>
        props.$active &&
        css`
            border-left-color: var(--accent);
            background: var(--surface);
            color: var(--accent-strong);
            font-weight: 600;
        `}
`;

export const Content = styled.main`
    min-width: 0;
    line-height: 1.7;
`;

/* --- hero ---------------------------------------------------------------- */

export const Hero = styled.section`
    padding: 2rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background: var(--surface);
    margin-bottom: 1.5rem;

    h1 {
        margin: 0 0 0.4rem;
        font-size: 2rem;
        border: none;
        padding: 0;
    }
`;

export const Tagline = styled.p`
    margin: 0 0 1.2rem;
    color: var(--text-muted);
    font-size: 1.05rem;
`;

export const HeroActions = styled.div`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
`;

/* --- project cards ------------------------------------------------------- */

export const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
`;

export const ProjectCard = styled.a`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.1rem 1.2rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background: var(--surface);
    color: var(--text);

    &:hover {
        text-decoration: none;
        border-color: var(--border-strong);
        background: rgba(76, 141, 255, 0.08);
    }
`;

export const ProjectTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-size: 1.15rem;
    color: var(--text-strong);
`;

export const ProjectPackage = styled.code`
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
`;

export const ProjectTagline = styled.p`
    margin: 0;
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.55;
`;

export const ProjectMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: auto;
    padding-top: 0.5rem;
    font-size: 0.78rem;
    color: var(--text-muted);
`;

export const ProjectHead = styled.header`
    padding: 1.6rem 1.8rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background: var(--surface);
    margin-bottom: 1.5rem;

    h1 {
        margin: 0 0 0.35rem;
        font-size: 1.8rem;
        border: none;
        padding: 0;
    }
`;

export const ProjectHeadMeta = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1.2rem;
    margin-top: 0.6rem;
    font-size: 0.85rem;
    color: var(--text-muted);
`;

/* --- notices ------------------------------------------------------------- */

export const Notice = styled.p<{ $subtle?: boolean }>`
    margin: 0 0 1.25rem;
    padding: 0.7rem 0.9rem;
    border-left: 3px solid ${props => (props.$subtle ? "var(--border-strong)" : "var(--accent)")};
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    background: var(--surface);
    color: var(--text-muted);
    font-size: 0.88rem;
`;

export const Badge = styled.span`
    margin-left: 0.4rem;
    padding: 0.05rem 0.4rem;
    border-radius: var(--radius-xs);
    background: var(--surface);
    border: 1px solid var(--border);
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
`;

/** Generated from the git history, appended under every documentation page. */
export const DocMeta = styled.p`
    margin-top: 2.5rem;
    padding-top: 0.9rem;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.82rem;
`;

/* --- documentation index ------------------------------------------------- */

export const DocIndex = styled.section`
    ul {
        padding-left: 1.1rem;
    }

    li {
        margin: 0.3rem 0;
    }
`;

/* --- markdown ------------------------------------------------------------ */

export const MarkdownBody = styled.div`
    h1,
    h2,
    h3,
    h4 {
        color: var(--text-strong);
        line-height: 1.3;
        margin: 1.8rem 0 0.7rem;
    }

    h1 {
        font-size: 1.85rem;
        padding-bottom: 0.4rem;
        border-bottom: 1px solid var(--border);
    }

    h2 {
        font-size: 1.4rem;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid var(--border);
    }

    h3 {
        font-size: 1.15rem;
    }

    p,
    li {
        color: var(--text);
    }

    ul,
    ol {
        padding-left: 1.4rem;
    }

    li + li {
        margin-top: 0.25rem;
    }

    blockquote {
        margin: 1rem 0;
        padding: 0.6rem 1rem;
        border-left: 3px solid var(--border-strong);
        background: var(--surface);
        border-radius: 0 var(--radius-md) var(--radius-md) 0;
        color: var(--text-muted);
    }

    code {
        padding: 0.12rem 0.35rem;
        border-radius: var(--radius-xs);
        background: var(--code-bg);
        border: 1px solid var(--border);
        font-family: var(--font-mono);
        font-size: 0.85em;
    }

    pre {
        overflow-x: auto;
        padding: 1rem;
        border-radius: var(--radius-lg);
        background: var(--code-bg);
        border: 1px solid var(--border);

        code {
            padding: 0;
            border: none;
            background: none;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
        font-size: 0.92rem;
    }

    th,
    td {
        padding: 0.5rem 0.7rem;
        border: 1px solid var(--border);
        text-align: left;
    }

    th {
        background: var(--surface);
        color: var(--text-strong);
    }

    img {
        max-width: 100%;
    }

    hr {
        border: none;
        border-top: 1px solid var(--border);
        margin: 2rem 0;
    }
`;

/* --- footer -------------------------------------------------------------- */

export const Footer = styled.footer`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
    justify-content: space-between;
    padding: 1.2rem 1.5rem;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.82rem;

    nav {
        display: flex;
        gap: 1rem;
    }
`;
