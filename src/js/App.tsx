import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import GlobalSettingsProvider from "./GlobalSettings/GlobalSettingsProvider";
import MainContainer from "./MainContainer/MainContainer";
import theme from "./Theme/Theme";

export function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <GlobalSettingsProvider>
        <MainContainer />
      </GlobalSettingsProvider>
    </ChakraProvider>
  );
}
