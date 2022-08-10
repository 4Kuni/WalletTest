import { 
    Flex,
  } from "@chakra-ui/react";
import * as React from "react"
import Header from "../components/Header/Header";
import Transactions from "../components/Transactions/Transactions";
import Wallet from "../components/Wallet/Wallet";
import useGlobalSettings from '../GlobalSettings/useGlobalSettings';



function MainContainer(): JSX.Element {

    const {mainContent} = useGlobalSettings();
  
    return (
    <Flex 
        direction = {'column'}
        alignItems = {'center'}
        minHeight = {window.innerHeight}
    >
        <Header/>
        <Flex 
            pt = {3}
            flex = {1}
            width = {'100%'}
            maxWidth = {'8xl'}
        >
            {
                mainContent === 'wallet' ?
                
                <Wallet/>
                :
                <Transactions/>
            }
        </Flex>
    </Flex>
    );
}



export default React.memo(MainContainer);
