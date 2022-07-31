import { 
    Box,
    Button,
    Flex,
    Image,
    Square,
    useBreakpointValue
  } from "@chakra-ui/react";
import * as React from "react"
import SideBar, { SideBarDrawer } from "../components/SideBar/SideBar";
import Transactions from "../components/Transactions/Transactions";
import Wallet from "../components/Wallet/Wallet";
import useGlobalSettings from '../GlobalSettings/useGlobalSettings';



function MainContainer(): JSX.Element {

    const [isSideBarOpened, setIsSideBarOpened] = React.useState(true);
    const isSideBarDrawer = useBreakpointValue<boolean>({
        lg: false,
        md: true, 
        sm: true,
        base: true
    });
    const {hardware, isPhoneHardware, mainContent} = useGlobalSettings();


    React.useEffect(() => {

        // I had to do so, because sidebar does not render when the application starts, and so user cannot recieve any call request from connected dApp
        setTimeout(() => setIsSideBarOpened(false), 0);
    }, []);

    const onCloseSideBarDrawer = React.useCallback(() => {

        setIsSideBarOpened(false);
    }, []);
  
  
    return (
    <Flex 
        direction = {isPhoneHardware(hardware) ? 'column' :{base: 'column', lg: 'row'}} 
        bg = {'walletBackground'}
        justifyContent = {'center'}
        minHeight = {isPhoneHardware(hardware) ?  window.screen.height * window.devicePixelRatio : window.innerHeight}
    >
        <Box 
            width = {(isSideBarDrawer || isPhoneHardware(hardware)) ? '100%' : '350px'}
            bgColor = {'walletBackground'}
            borderLeftWidth = {1}
            borderColor = {'sideBarBackground'}
            position = {'sticky'}
            top = {0}
        >
            <Box position = {'sticky'} top = {0}>
            { isSideBarDrawer || isPhoneHardware(hardware) ?
                <>
                        <Button
                            ml = {5}
                            mt = {5}
                            variant = {'ghost'}
                            onClick = {() => setIsSideBarOpened(true)}
                        >
                            <Image 
                                boxSize = {isPhoneHardware(hardware) ? '60px' : '30px'}
                                src = {'https://freeiconshop.com/wp-content/uploads/edd/menu-outline.png'}
                            />
                        </Button>
                        <SideBarDrawer isOpen = {isSideBarOpened} onClose = {onCloseSideBarDrawer} />
                </>
                :
                <SideBar/>
            }
            </Box>
        </Box>
        <Flex 
            flex = {1}
            maxWidth = {'6xl'}
            borderRightWidth = {1}
            borderColor = {'sideBarBackground'}
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
