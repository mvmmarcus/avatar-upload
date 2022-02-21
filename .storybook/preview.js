import GlobalStyles from "styles/global";
import theme from "styles/theme";
import { ThemeProvider } from "styled-components";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];
