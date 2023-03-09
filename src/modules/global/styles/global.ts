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
        opacity: 0.8;
    }
`;
