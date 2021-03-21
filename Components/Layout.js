import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import GlobalStyles from "../styles/GlobalStyles";
import appTheme from "../styles/appTheme";

// Persistent Layout
const Layout = ({ children }) => (
  <EmotionThemeProvider theme={appTheme}>
    <GlobalStyles />
    {children}
  </EmotionThemeProvider>
);

export default Layout;
