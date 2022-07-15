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
import { IBalanceViewProps } from '../../../types/Types';



function BalanceView({accountBalance}: IBalanceViewProps): JSX.Element {

    return (
        <Flex width = {'100%'} direction = {'row'}>
            <Image mb = {14} alignSelf = {'end'} boxSize = {'75px'} src = {ethImage} />
            <Flex direction = {'column'}>
                <Spacer/>
                <Text 
                    fontSize={87}
                    m = {4}
                    mb = {8}
                >
                    ETH
                </Text>
            </Flex>
            <Spacer/>
            <Box>
                <Heading opacity = {0.5} size = {'2xl'}>balance</Heading>
                <Text textAlign={'end'} fontSize = {175}>
                    {accountBalance}
                </Text>
            </Box>
        </Flex>
    );
}



export default React.memo(BalanceView);