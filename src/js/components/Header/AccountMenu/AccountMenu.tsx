import { CheckCircleIcon, CopyIcon } from '@chakra-ui/icons';
import { 
    Image,
    Button, 
    Flex, 
    Icon, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Spacer, 
    Text, 
    Tooltip
} from '@chakra-ui/react';
import * as React from 'react';
import useGlobalSettings from '../../../GlobalSettings/useGlobalSettings';
import useAccount from '../../AccountProvider/useAccount';
import useMetamask from '../../ConnectMetamask/useMetamask';
import AccountContent from './ModalContents/AccountContent';
import ConnectWalletContent from './ModalContents/ConnectWalletContent';



function AccountMenu() {

    const {account} = useAccount();
    const {hardware, isPhoneHardware} = useGlobalSettings();
    const [isAccountModalOpen, setIsAccountModalOpen] = React.useState<boolean>(false);
    const [isConnectModalOpen, setIsConnectModalOpen] = React.useState<boolean>(false);

    
    return (
        <>
            <Flex 
                direction = {'row'} 
                h = {isPhoneHardware(hardware) ? '75px' : '50px'}
                borderWidth = {1}
                alignItems = {'center'}
                borderRadius = {10}
                gap = {3}
                p = {1}
            >   
                {
                    account.account ? 
                    <>
                        <Tooltip label = {account.balance!} >
                            <Text pl = {2} fontSize={isPhoneHardware(hardware) ? '24px' : '16px'}>
                                {account.balance?.toFixed(2)} ETH
                            </Text>
                        </Tooltip>
                        <Button h = {'100%'} onClick = {() => setIsAccountModalOpen(previous => previous = true)}>
                            <Text  
                                noOfLines={1}
                                maxW = {isPhoneHardware(hardware) ? '195px' : '130px'}
                                display = {'block !important'}
                                fontSize={isPhoneHardware(hardware) ? '24px' : '16px'}
                            >
                                {account.account}
                            </Text>
                        </Button>
                    </>
                    :
                    <Button 
                        w = {isPhoneHardware(hardware) ? '300px' : '200px'} 
                        h = {'100%'} 
                        onClick = {() => setIsConnectModalOpen(previous => previous = true)}
                        fontSize = {isPhoneHardware(hardware) ? '24px' : '16px'}
                    >
                        Connect Wallet
                    </Button>
                }
            </Flex>
            <Modal
                isOpen = {(isAccountModalOpen && account.account || isConnectModalOpen) ? true : false}
                onClose = {() => { setIsAccountModalOpen(previous => previous = false); setIsConnectModalOpen(previous => previous = false) }}
                size = {isPhoneHardware(hardware) ? '3xl': 'md'}
            >
                <ModalOverlay/>
                {
                    account.account ? 
                        isConnectModalOpen ?
                        <ConnectWalletContent setIsAccountModalOpen = {setIsAccountModalOpen} setIsConnectModalOpen = {setIsConnectModalOpen}/>
                        :
                        <AccountContent setIsAccountModalOpen = {setIsAccountModalOpen} setIsConnectModalOpen = {setIsConnectModalOpen}/>
                    :
                    <ConnectWalletContent setIsAccountModalOpen = {setIsAccountModalOpen} setIsConnectModalOpen = {setIsConnectModalOpen}/>
                }
                
            </Modal>
        </>
    );
}



export default React.memo(AccountMenu);