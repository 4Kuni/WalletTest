import * as React from 'react';
import { 
    Box,
    Flex, 
    Drawer, 
    DrawerContent, 
    DrawerOverlay, 
    Spacer, 
    DrawerCloseButton
} from '@chakra-ui/react';
import Account from './Account/Account';
import Dapp from './Dapp/Dapp';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import { ISideBarDrawerProps } from '../../types/Types';


function SideBar(): JSX.Element {
    
    return (
        
        <Flex
            borderRightRadius={15} 
            direction = {'column'}
            bgColor = {'sideBarBackground'}
            px = {10}
            height = {'100%'}
            gap = {10}
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
    
    return (
        <Drawer
            placement={'left'}
            isOpen = {isOpen}
            onClose = {onClose}
        >
            <DrawerOverlay/>
            <DrawerContent borderRightRadius={15} >
                <DrawerCloseButton/>
                <SideBar/>
            </DrawerContent>
        </Drawer>
    );
}