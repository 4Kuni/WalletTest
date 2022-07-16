import * as React from 'react';
import { 
    Box,
    Flex, 
    Drawer, 
    DrawerContent, 
    DrawerOverlay, 
    Spacer, 
    Button,
    Image
} from '@chakra-ui/react';
import Account from './Account/Account';
import Dapp from './Dapp/Dapp';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import { ISideBarDrawerProps } from '../../types/Types';
import useGlobalSettings from '../../GlobalSettings/useGlobalSettings';


function SideBar(): JSX.Element {
    
    const {hardware, isPhoneHardware} = useGlobalSettings();


    return (
        
        <Flex
            borderRightRadius={isPhoneHardware(hardware) ? 0 : 15} 
            direction = {'column'}
            bgColor = {'sideBarBackground'}
            px = {10}
            height = {'100%'}
            width = {'100%'}
            gap = {isPhoneHardware(hardware) ? 20 : 10}
        >   
            <Box pt = {10}>
                <Account/>
            </Box>
            <Dapp/>
            <ThemeSwitcher/>
            <Spacer/>
        </Flex>
    );
}



export default React.memo(SideBar);

export function SideBarDrawer({isOpen, onClose}: ISideBarDrawerProps): JSX.Element {

    const {hardware, isPhoneHardware} = useGlobalSettings();

    
    return (
        <Drawer
            size = {isPhoneHardware(hardware) ? 'lg' : 'xs'}
            placement={'left'}
            isOpen = {isOpen}
            onClose = {onClose}
        >
            <DrawerOverlay/>
            <DrawerContent bgColor = {'sideBarBackground'} borderRightRadius={15} pt = {5}>
                <Flex  
                    direction = {'row'}
                >
                    <Spacer/>
                    <Button
                        mr = {5}
                        p = {0}
                        variant = {'ghost'}
                        onClick = {onClose}
                        justifyContent = {'center'}
                        justifySelf = {'end'}
                        boxSize = {isPhoneHardware(hardware) ? '60px' : '30px'} 
                    >
                        <Image 
                            boxSize = {isPhoneHardware(hardware) ? '60px' : '30px'} 
                            src = {'http://cdn.onlinewebfonts.com/svg/img_391885.png'}
                        />
                    </Button>
                </Flex>
                <SideBar/>
            </DrawerContent>
        </Drawer>
    );
}