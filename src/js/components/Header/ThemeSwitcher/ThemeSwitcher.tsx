import * as React from 'react';
import {
    Spacer, 
    Switch,
    Text,
    useColorMode
} from '@chakra-ui/react';
import useGlobalSettings from '../../../GlobalSettings/useGlobalSettings';



function ThemeSwitcher(): JSX.Element {

    const {colorMode, toggleColorMode} = useColorMode();
    const {isPhoneHardware, hardware} = useGlobalSettings();


    return (
        <>
            <Text
                pl = {3}
                fontSize = {isPhoneHardware(hardware) ? '30px' : '20px'}
                fontWeight={'bold'}
            >
                Dark Mode
            </Text>
            <Spacer/>
            <Switch 
                mr = {3}
                isChecked = {colorMode === 'dark'} 
                onChange = {toggleColorMode} 
                size = {isPhoneHardware(hardware) ? 'lg' : 'md'}
            />
        </> 
    );
}



export default  React.memo(ThemeSwitcher);