import { 
    Flex, 
    Spacer,
    Button,
    Square,
    Box
} from '@chakra-ui/react';
import * as React from 'react';
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


    const connectMetamask = React.useCallback(async () => {

        if(!providerState) {

            const isDetected = await detectProvider();

            if(isDetected === false) {
                
                setIsAlertDialogOpen(!isDetected);
                return;
            }
        }
    }, [providerState]);

    const onCloseAlertDialog = React.useCallback(() => {

        setIsAlertDialogOpen(false)
    }, []);


    return (
        
        <Flex 
            width = {'100%'} 
            height = {'100%'}
            maxWidth = {'1500'} 
            px = {10} 
            bg = {'walletBackground'} 
            direction = {'column'}
            overflow = {'hidden'}
        >
            { 
                providerState ?
                (
                    (account.account !== null && account.balance !== null) ? 
                    <Flex direction = {'column'} height = {'100%'}>
                        <Box mt = {10} opacity = {0.5}>
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
                <>
                    <Square sx = {squareSizeStyle}>
                        <Button bg = {'positiveButton'} w = {'250px'} onClick = {connectMetamask}>Connect Wallet</Button>
                    </Square>
                    <AlertDialogMetamask 
                        isOpen = {isAlertDialogOpen}
                        onClose = {onCloseAlertDialog}
                    />
                </>
            }
        </Flex>   
    );
}



export default React.memo(Wallet);