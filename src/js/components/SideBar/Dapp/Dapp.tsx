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
import useAccount from '../Account/useAccount';
import useConnector from './useConnector';



function Dapp() {

    const [connector, connect, disconnect] = useConnector();
    const uri = React.useRef<string>('');
    const inputRef = React.useRef<any>();
    const {account, disconnectDapp} = useAccount();


    const dAppWindowStyle = {
        p: 2,
        border: '1px',
        borderColor: 'dAppWindowBorder',
        borderBottom: 0,
        flexDirection: 'column',
        gap: 2
    }


    React.useEffect(() => {
        
        disconnectDapp.current = disconnect;
    }, [disconnect, disconnectDapp]);


    return (
        <Accordion borderColor={'dAppWindowBorder'} allowMultiple>
            <AccordionItem>
                <AccordionButton>
                    <Text>Connected dApp</Text>
                    <Spacer/>
                    <AccordionIcon />
                </AccordionButton>

                <AccordionPanel p = {0}>
                {
                    account.account !== null && account.chainId !== null ?
                    (
                        connector ? 
                        <Flex sx = {dAppWindowStyle}>
                            <Flex direction = {'row'} gap = {2}>
                                <Image 
                                    boxSize={'50px'}
                                    src = {connector.peerMeta?.icons[0]}
                                />
                                <Link isExternal alignSelf = {'center'} href = {connector.peerMeta?.url}>{connector.peerMeta?.name}</Link>
                            </Flex>
                            <Button 
                                variant = 'solid'
                                bg = {'negativeButton'}
                                color = {'defaultReverse'}
                                onClick = {disconnect}
                            >
                                DISCONNECT
                            </Button>
                        </Flex>
                        :
                        <Flex sx = {dAppWindowStyle}>
                            <Input 
                                width = {'100%'}
                                onChange = {(event: React.ChangeEvent<HTMLInputElement>) => uri.current = event.target.value}
                                placeholder = 'Enter WalletConnect URI'
                                ref = {inputRef}
                            />
                            <Flex>
                                <Spacer/>
                                <Button
                                    variant = 'solid'
                                    bg = {'positiveButton'}
                                    color = {'black'}
                                    onClick = {() => {

                                        connect(uri.current, account.account!, account.chainId!)
                                        inputRef.current.value = '';
                                    }}
                                >
                                    CONNECT
                                </Button>
                            </Flex>
                        </Flex>
                    )
                    :
                    <Flex minHeight = {'100px'} direction = {'row'} width = {'100%'}>
                        <Box alignSelf = {'center'}>Please, login to your account</Box>
                        <Spacer/>
                        <Icon alignSelf={'center'}/>
                    </Flex>
                }
                    
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}



export default React.memo(Dapp);