import { 
    Accordion, 
    AccordionButton, 
    AccordionIcon, 
    AccordionItem, 
    AccordionPanel,
    Button,
    Flex,
    Link,
    Image,
    Input,
    Spacer,
    Text,
    Icon,
    Box
} from '@chakra-ui/react';
import * as React from 'react'; 
import useGlobalSettings from '../../../GlobalSettings/useGlobalSettings';
import useAccount from '../Account/useAccount';
import useConnector from './useConnector';



const dAppWindowStyle = {
    p: 2,
    border: '1px',
    borderColor: 'dAppWindowBorder',
    borderBottom: 0,
    flexDirection: 'column',
    gap: 2
}



function Dapp() {

    const [connector, connect, disconnect] = useConnector();
    const uri = React.useRef<string>('');
    const inputRef = React.useRef<any>();
    const {account, disconnectDapp} = useAccount();
    const {isPhoneHardware, hardware} = useGlobalSettings();


    const textStyle = {
        fontSize: isPhoneHardware(hardware) ? '30px' : '20px'
    }

    const buttonStyle = {
        color: 'defaultReverse',
        variant: 'solid',
        height: isPhoneHardware(hardware) ? '70px' : '47px'
    }


    React.useEffect(() => {
        
        disconnectDapp.current = disconnect;
    }, [disconnect, disconnectDapp]);


    return (
        <Accordion borderColor={'dAppWindowBorder'} allowMultiple>
            <AccordionItem>
                <AccordionButton>
                    <Text sx = {textStyle}>Connected dApp</Text>
                    <Spacer/>
                    <AccordionIcon boxSize={isPhoneHardware(hardware) ? '37.5px' : '25px'}/>
                </AccordionButton>

                <AccordionPanel p = {0}>
                {
                    account.account !== null && account.chainId !== null ?
                    (
                        connector ? 
                        <Flex sx = {dAppWindowStyle}>
                            <Flex direction = {'row'} gap = {2}>
                                <Image 
                                    boxSize={isPhoneHardware(hardware) ? '75px' : '50px'}
                                    src = {connector.peerMeta?.icons[0]}
                                />
                                <Link sx = {textStyle} isExternal alignSelf = {'center'} href = {connector.peerMeta?.url}>{connector.peerMeta?.name}</Link>
                            </Flex>
                            <Button
                                bg = {'negativeButton'}
                                onClick = {disconnect}
                                sx = {{...textStyle, ...buttonStyle}}
                            >
                                DISCONNECT
                            </Button>
                        </Flex>
                        :
                        <Flex sx = {dAppWindowStyle}>
                            <Input 
                                width = {'100%'}
                                onChange = {(event: React.ChangeEvent<HTMLInputElement>) => uri.current = event.target.value}
                                placeholder = 'WalletConnect URI'
                                sx = {textStyle}
                                ref = {inputRef}
                                height = {isPhoneHardware(hardware) ? '80px' : '53px'}
                            />
                            <Flex>
                                <Spacer/>
                                <Button
                                    bg = {'positiveButton'}
                                    onClick = {() => {

                                        connect(uri.current, account.account!, account.chainId!)
                                        inputRef.current.value = '';
                                    }}
                                    sx = {{...textStyle, ...buttonStyle}}
                                >
                                    CONNECT
                                </Button>
                            </Flex>
                        </Flex>
                    )
                    :
                    <Flex minHeight = {'100px'} direction = {'row'} width = {'100%'} gap = {2} px = {5}>
                        <Box sx = {textStyle} alignSelf = {'center'}>Please, login to your account</Box>
                        <Spacer/>
                        <Icon boxSize = {isPhoneHardware(hardware) ? '30px' : '20px'} alignSelf={'center'}/>
                    </Flex>
                }
                    
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}



export default React.memo(Dapp);