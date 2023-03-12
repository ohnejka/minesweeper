import { createGlobalStyle } from 'styled-components';
import { baseTheme } from './theme';

export default createGlobalStyle`
    * {
    box-sizing: border-box;
    }

    #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        color: ${baseTheme.layout.gray12};
    }

    body {
        min-width: 320px;
        font-family: monospace;
        transition: opacity 0.2s ease;
    }

    .--muted {
        pointer-events: none;
        user-select: none;
        opacity: 0.3;
    }

    .visually-hidden {
        position: absolute !important;
        overflow: hidden !important;
        clip: rect(0 0 0 0);
        height: 1px !important;
        width: 1px !important;
        margin: -1px !important;
        padding: 0 !important;
        border: 0 !important;
        white-space: nowrap !important;
        opacity: 0 !important;
    }

    ul {
        list-style: none;
    }

    a {
        color: inherit; 
        text-decoration: inherit;
        transition: color 0.2s ease;

        &:visited {
            color: inherit; 
        }

        &:hover,
        &:focus {
            color: ${baseTheme.layout.accent1};
        }

        &:active {
            color: ${baseTheme.layout.accent2};
        }

        &.--link-active {
            color: ${baseTheme.layout.accent2};
        }
    }

    .MuiTypography-root.MuiTypography-body1.MuiFormControlLabel-label  {
        font-family: monospace;
    }
`;
