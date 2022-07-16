import { 
    Box,
    Button,
    Flex,
    Image,
    useBreakpointValue
  } from "@chakra-ui/react";
import * as React from "react"
import SideBar, { SideBarDrawer } from "../components/SideBar/SideBar";
import Wallet from "../components/Wallet/Wallet";
import useGlobalSettings from '../GlobalSettings/useGlobalSettings';



function MainContainer(): JSX.Element {

    const [isSideBarOpened, setIsSideBarOpened] = React.useState(true);
    const isSideBarDrawer = useBreakpointValue<boolean>({
        md: false, 
        sm: true,
        base: true
    });
    const {hardware, isPhoneHardware} = useGlobalSettings();


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
        direction = {isPhoneHardware(hardware) ? 'column' :{base: 'column', md: 'row'}} 
        height = {window.innerHeight}
    >
        <Box bgColor = {'walletBackground'} width = {isPhoneHardware(hardware) ? '100%' : {base: '100%', md: '600px'}} overflow = {'hidden'}>
            { isSideBarDrawer || isPhoneHardware(hardware) ?
                <Box>
                        <Button 
                            mt = {10}
                            ml = {10}
                            pb = {10}
                            variant = {'ghost'}
                            onClick = {() => setIsSideBarOpened(true)}
                        >
                            <Image 
                                boxSize = {isPhoneHardware(hardware) ? '60px' : '30px'} 
                                src = {'https://freeiconshop.com/wp-content/uploads/edd/menu-outline.png'}
                            />
                        </Button>
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

function userGlobalSettings(): { isPortraitOrientation: any; } {
    throw new Error("Function not implemented.");
}
