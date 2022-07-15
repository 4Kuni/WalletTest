import { 
    Box,
    Flex,
    IconButton,
    useBreakpointValue
  } from "@chakra-ui/react";
  import * as React from "react"
import { AiOutlineBars } from "react-icons/ai";
  import SideBar, { SideBarDrawer } from "./components/SideBar/SideBar";
  import Wallet from "./components/Wallet/Wallet";
  
  

function MainContainer(): JSX.Element {

    const isSideBarDrawer = useBreakpointValue<boolean>({
        md: false, 
        sm: true,
        base: true
    });
    const [isSideBarOpened, setIsSideBarOpened] = React.useState(true);


    React.useEffect(() => {
        // I had to do so, because sidebar does not render when the application starts, and so user cannot recieve any call request from connected dApp
        setTimeout(() => setIsSideBarOpened(false), 0);
    }, []);

    const onCloseSideBarDrawer = React.useCallback(() => {

        setIsSideBarOpened(false);
    }, []);
  
  
    return (
    <Flex 
        justifyContent = {'center'} 
        width = {'100%'} 
        direction = {{base: 'column', md: 'row'}} 
        height = {window.innerHeight}
    >
        <Box bgColor = {'walletBackground'} width = {{base: '100%', md: '500px'}} overflow = {'hidden'}>
            { isSideBarDrawer ?
                <Box>
                        <IconButton 
                            mt = {5}
                            ml = {10}
                            variant = {'ghost'}
                            aria-label={'Open side bar'}
                            icon = {<AiOutlineBars size={30}/>}
                            width = {30}
                            onClick = {() => setIsSideBarOpened(true)}
                        />
                        <SideBarDrawer isOpen = {isSideBarOpened} onClose = {onCloseSideBarDrawer} />
                </Box>
                :
                <SideBar/>
            }
        </Box>
        <Wallet/>
    </Flex>
    );
}



export default React.memo(MainContainer);