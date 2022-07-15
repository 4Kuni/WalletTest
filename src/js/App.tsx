import { 
  ChakraProvider,
} from "@chakra-ui/react";
import * as React from "react"
import EthereumProvider from "./components/EthereumProvider/EthereumProvider";
import AccountProvider from "./components/SideBar/Account/AccountProvider";
import MainContainer from "./MainContainer";
import theme from './Theme/Theme';



export function App(): JSX.Element {

    return (
      <ChakraProvider theme = {theme}>
          <EthereumProvider>
              <AccountProvider>
                  <MainContainer/>
              </AccountProvider>
          </EthereumProvider>
      </ChakraProvider>
    );
}