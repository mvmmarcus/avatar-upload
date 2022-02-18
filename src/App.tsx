import { ThemeProvider } from "styled-components";

import AvatarUpload from "components/AvatarUpload";
import Main from "components/Main";

import GlobalStyles from "styles/global";
import theme from "styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Main>
        <AvatarUpload />
      </Main>
    </ThemeProvider>
  );
}

export default App;
