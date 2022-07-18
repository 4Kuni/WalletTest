import { 
    Flex, 
    Spacer,
    Button,
    Square,
    Box
} from '@chakra-ui/react';
import * as React from 'react';
import useGlobalSettings from '../../GlobalSettings/useGlobalSettings';
import useEthereumProvider from '../EthereumProvider/useEthereumProvider';
import useAccount from '../SideBar/Account/useAccount';
import AlertDialogMetamask from './AlertDialogMetamask/AlertDialogMetamask';
import BalanceView from './Balance/BalanceView';
import Exchange from './Exchange/Exchange';
import WaitingView from './WaitingView/WaitingView';



const squareSizeStyle = {
    minWidth: '100%',
    minHeight: '100%'
}



function Wallet(): JSX.Element {

    const {providerState, detectProvider} = useEthereumProvider();
    const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState<boolean>(false);
    const {account} = useAccount();
    const {isPhoneHardware, hardware} = useGlobalSettings();
    const [isButtonAccessible, setIsButtonAccessible] = React.useState<boolean>(true);

    const connectMetamask = React.useCallback(async () => {

        if(!providerState) {

            setIsButtonAccessible(false);
            setTimeout(() => {

                setIsButtonAccessible(true); 
            }, 5000);

            const isDetected = await detectProvider();

            if(isDetected === false) {
                
                setIsAlertDialogOpen(!isDetected);
                return;
            }
        }
    }, [providerState]);

    const onCloseAlertDialog = React.useCallback(() => {

        setIsButtonAccessible(true);
        setIsAlertDialogOpen(false)
    }, []);


    return (
        providerState ?
        (
            (account.account !== null && account.balance !== null) ? 
            <Flex direction = {'column'} width = {'100%'} mx = {10}>
                <Box opacity = {0.5}>
                    <Exchange/>
                </Box>
                <Spacer/>
                <BalanceView accountBalance = {account.balance}/>
            </Flex>
            :
            <Square sx = {squareSizeStyle}>
                <WaitingView>Please, wait for data confirmation</WaitingView>
            </Square>
        )
        
        :

        <Square sx = {squareSizeStyle}>
            <Button 
                isLoading = {!isButtonAccessible}
                bg = {'positiveButton'} 
                w = {isPhoneHardware(hardware) ? '60%' : '250px'} 
                h = {isPhoneHardware(hardware) ? '100px' : '50px'}
                fontSize = {isPhoneHardware(hardware) ? 50 : 18}
                onClick = {connectMetamask}
            >
                Connect Wallet
            </Button>
            <AlertDialogMetamask 
                isOpen = {isAlertDialogOpen}
                onClose = {onCloseAlertDialog}
            />
        </Square>
    );
}



export default React.memo(Wallet);