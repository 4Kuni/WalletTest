import * as React from 'react';
import {
    Flex, 
    Spacer, 
    Switch,
    Text,
    useColorMode
} from '@chakra-ui/react';



function ThemeSwitcher(): JSX.Element {

    const {colorMode, toggleColorMode} = useColorMode();


    return (
        <Flex alignItems = {'center'} direction = {'row'}>
            <Text
                fontWeight={'bold'}
            >
                Dark Mode
            </Text>
            <Spacer/>
            <Switch isChecked = {colorMode === 'dark'} onChange = {toggleColorMode}/>
        </Flex>
    );
}



export default  React.memo(ThemeSwitcher);