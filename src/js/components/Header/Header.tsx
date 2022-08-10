import * as React from 'react';
import { 
    Flex, 
    Spacer,
    useColorMode
} from '@chakra-ui/react';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import Logo from './Logo/Logo';
import AccountMenu from './AccountMenu/AccountMenu';
import NetworkSelector from './NetworkSelector/NetworkSelector';


function Header(): JSX.Element {

    const {colorMode} = useColorMode();

    return (
        
        <Flex 
            width = {'100%'}
            maxWidth = {'8xl'}
            position = {'sticky'}
            top = {0}
            padding = {2}
            gap = {5}
            pt = {5}
            px = {10}
            bgColor = {colorMode === 'light' ? 'white' : '#1a202c'}
            borderBottomRadius = {10}
        >
            <Logo/>
            <Spacer/>
            <NetworkSelector/>
            <AccountMenu/>
            <DropdownMenu/>
        </Flex>
    );
}



export default React.memo(Header);