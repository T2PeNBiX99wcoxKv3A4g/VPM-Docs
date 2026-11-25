import { css, styled } from "styled-components";

/** Shared look of the two links in the hero. */
export const buttonBase = css`
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 1.1rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-strong);
    color: var(--text);
    font-weight: 600;
    font-size: 0.92rem;

    &:hover {
        text-decoration: none;
        background: var(--surface);
    }
`;

const primary = css`
    background: var(--accent);
    border-color: var(--accent);
    color: var(--text-on-accent);

    &:hover {
        background: var(--accent-strong);
    }
`;

// Transient prop (`$`) so styled-components does not forward it to the DOM.
export const ButtonLink = styled.a<{ $primary?: boolean }>`
    ${buttonBase}
    ${props => props.$primary && primary}
`;
