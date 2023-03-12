import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
    box-sizing: border-box;
    }

    body {
        min-width: 320px;
        transition: opacity 0.2s ease;
    }

    .--muted {
        pointer-events: none;
        user-select: none;
        opacity: 0.5;
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
`;
