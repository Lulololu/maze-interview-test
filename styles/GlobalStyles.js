import { css, Global } from "@emotion/react";

// Emotion Global Styles
// Next.js authorizes Materialize.css (Global CSS) to be imported ONLY from _app.js
const GlobalStyles = () => (
  <Global
    // CSS Format
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      /* Text Selection */
      ::selection {
        color: var(--secondary-lightest2);
        background-color: var(--primary-main);
      }

      html {
        box-sizing: border-box;
        height: 100%;
        font-size: 16px; /* Fixed Default Font Size - Because Relative Value (rm / %) would break 
          the layout if User changed Default Font Size in navigator. So layout will
          stay the same, if User changes Default Font Size. But Zoom is still
          possible, because of REM unit use through the App */
        scroll-behavior: smooth; /* Because some Browsers still don't support CSS "scroll-behavior: smooth", React-Scroll
          Library has also been used. cf -> Note 4 */
      }

      body {
        min-width: 320px;
        height: 100%;
        font-family: "Nexa Regular", -apple-system, BlinkMacSystemFont,
          "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol";
        background-color: var(--global-background-color);

        /* Colors Scheme */
        --color-1: #3e3245;
        --color-2: #524a79;
        --color-3: #97d8ec;
        --color-4: #74bbca;
        --color-5: #ed254e;
        --color-6: #efbdeb;
      }

      #__next {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        min-width: 300px;
        min-height: 100%;
      }
    `}
  />
);

export default GlobalStyles;
