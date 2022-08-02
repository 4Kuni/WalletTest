import { HamburgerIcon } from '@chakra-ui/icons';
import { 
    Box,
    Button,
    Flex,
    Image, 
    Menu, 
    MenuButton,
    MenuItem,
    MenuList,
    Text
} from '@chakra-ui/react';
import * as React from 'react';
import useGlobalSettings from '../../../GlobalSettings/useGlobalSettings';
import useAccount from '../../AccountProvider/useAccount';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';



function DropdownMenu(): JSX.Element {

    const {hardware, isPhoneHardware, mainContent, setMainContent} = useGlobalSettings();
    const {account} = useAccount();

    return ( 
        <Box boxSize = {isPhoneHardware(hardware) ? '75px' : '50px'} borderWidth = {1} p = {1} borderRadius = {10}>
            <Menu closeOnSelect = {false} >
                <MenuButton 
                    boxSize={'100%'}
                    as = {Button}
                    px = {2}
                >
                    <HamburgerIcon boxSize = {'100%'} justifySelf = {'center'}/>
                </MenuButton>
                <MenuList >
                    <MenuItem>
                        <Flex width={'100%'} alignItems = {'center'} direction = {'row'}>
                            <ThemeSwitcher/>
                        </Flex>
                    </MenuItem>
                    <MenuItem
                        isDisabled = {account.account ? (account.chainId === 3 ? false: true) : true}
                        onClick = {() => setMainContent(mainContent === 'wallet' ? 'transactions' : 'wallet')}
                    >
                        <Text
                            pl = {3}
                            fontSize = {isPhoneHardware(hardware) ? '30px' : '20px'}
                            fontWeight={'bold'}
                        >
                            {mainContent === 'wallet' ? 'Transactions' : 'Wallet'}
                        </Text>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
}



export default React.memo(DropdownMenu);