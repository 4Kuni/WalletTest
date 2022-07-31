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
import useEthereumProvider from '../../EthereumProvider/useEthereumProvider';
import useAccount from '../../SideBar/Account/useAccount';



function BalanceView({accountBalance}: IBalanceViewProps): JSX.Element {

    const {isPhoneHardware, hardware} = useGlobalSettings();
    const {providerState} = useEthereumProvider();
    const {account, updateAccountData} = useAccount();
    const [isCheckingNewBlock, setIsCheckingNewBlock] = React.useState<boolean>(true)


    React.useEffect(() => {

        providerState!.request({method: 'eth_newBlockFilter'})
        .then(filterId => {
            
            if(!filterId) {

                setIsCheckingNewBlock(prev => prev = false);
                return;
            }

            const checkIfNewBlock = () => {

                setTimeout(() => {
                    
                    providerState!.request({method: 'eth_getFilterChanges', params: [filterId]})
                    .then(result => {
                        
                        if(result.length > 0) { // block has been changed
                            updateAccountData(account.account!);
                            console.log('update');
                        }

                        if(isCheckingNewBlock) checkIfNewBlock();
                    })
                }, 500);
            }
    
            checkIfNewBlock();
        })
        .catch(error => {console.log(error)});

        return () => {
            console.log('cancel');
            setIsCheckingNewBlock(prev => prev = false);
        }
    }, []);


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