import { 
    Box,
    Flex,
    Heading,
    Image, 
    Spacer,
    Text
} from '@chakra-ui/react';
import * as React from 'react';
import ethImage from '../../../assets/eth_image';
import useGlobalSettings from '../../../GlobalSettings/useGlobalSettings';
import { IBalanceViewProps } from '../../../types/Types';



function BalanceView({accountBalance}: IBalanceViewProps): JSX.Element {

    const {isPhoneHardware, hardware} = useGlobalSettings();


    return (
        <Flex direction = {'row'}>
            <Image mb = {12} alignSelf = {'end'} boxSize = {isPhoneHardware(hardware) ? '140px' : '75px'} src = {ethImage} />
            <Flex direction = {'column'}>
                <Spacer/>
                <Text 
                     fontSize = {isPhoneHardware(hardware) ? 143 : 87}
                    pb = {6}
                >
                    ETH
                </Text>
            </Flex>
            <Spacer/>
            <Box>
                <Heading opacity = {0.5} size = {isPhoneHardware(hardware) ? '4xl' : '2xl'}>balance</Heading>
                <Text textAlign={'end'} fontSize = {isPhoneHardware(hardware) ? 300 : 175}>
                    {accountBalance}
                </Text>
            </Box>
        </Flex>
    );
}



export default React.memo(BalanceView);