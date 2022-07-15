import { 
    AlertDialog, 
    AlertDialogBody, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogOverlay, 
    Button,
    LinkBox,
    LinkOverlay,
    Text
} from '@chakra-ui/react';
import * as React from 'react';
import { IAlertDialogMetamaskProps } from '../../../types/Types';



function AlertDialogMetamask({isOpen, onClose}: IAlertDialogMetamaskProps): JSX.Element {

    const downloadRef = React.useRef<any>();

    return (
        <AlertDialog 
            isOpen = {isOpen}
            leastDestructiveRef={downloadRef}
            onClose = {onClose}
        >
            <AlertDialogOverlay/>
            <AlertDialogContent bg = {'alertDialogWindow'}>
                <AlertDialogHeader>
                    Metamask is missing!
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text>You have to download Metamask to your browser!</Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <LinkBox>
                        <Button 
                            onClick = {onClose} 
                            bg = {'positiveButton'} 
                            ref = {downloadRef}
                        >
                            <LinkOverlay isExternal href = {'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'}>
                                Download Metamask
                            </LinkOverlay>
                        </Button>
                    </LinkBox>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
);
}



export default React.memo(AlertDialogMetamask);