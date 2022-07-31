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
import useAccount from './Account/useAccount';
import NetworkSelector from './NetworkSelector/NetworkSelector';


function SideBar(): JSX.Element {
    
    const {hardware, isPhoneHardware, mainContent, setMainContent} = useGlobalSettings();
    const {account, onDisconnect} = useAccount();


    const buttonStyle = {
        pl: 3,
        borderRadius: 0,
        justifyContent: 'start',
        fontSize: isPhoneHardware(hardware) ? '30px' : '20px' 
    }


    return (
        
        <Flex
            borderRightRadius={isPhoneHardware(hardware) ? 0 : 15} 
            direction = {'column'}
            bgColor = {'sideBarBackground'}
            gap = {isPhoneHardware(hardware) ? 20 : 10}
            minHeight = {window.innerHeight}
            py = {5}
        >   
            <Box mx = {5} pb = {10}>
                <Account/>
            </Box>
            
            <Button 
                sx = {buttonStyle}
                isDisabled = {account.account === null || account.chainId !== 3} // ropsten chain id
                onClick = {() => mainContent === 'wallet' ? setMainContent('transactions') : setMainContent('wallet')}
                _hover = {{
                    opacity: 0.5
                }}    
                variant = {'ghost'}
            >
                {mainContent === 'wallet' ? 'Transactions' : 'Wallet'}
            </Button>
            
            <NetworkSelector/>
            <Dapp/>
            <ThemeSwitcher/>

            <Spacer/>

            <Button 
                sx = {buttonStyle}
                isDisabled = {account.account === null}
                _hover = {{
                    opacity: 0.5
                }}  
                onClick = {() => { onDisconnect(); setMainContent('wallet');}}
                variant = {'ghost'}
            >
                Disconnect
            </Button>
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