import { 
    Avatar, 
    Flex, 
    Spacer, 
    Text, 
    Tooltip,
    useClipboard
} from '@chakra-ui/react';
import * as React from 'react';
import useAccount from './useAccount';



const DEFAULT_ACCOUNT_NAME_VALUE = 'account';



function Account() {

    const {account} = useAccount();
    const copyValue: string = account.account ? account.account : DEFAULT_ACCOUNT_NAME_VALUE;
    const {onCopy, hasCopied} = useClipboard(copyValue);


    const nameAccountTextStyle = {
        alignSelf: 'center',
        fontSize: 20,
        maxWidth: '150px',
        noOfLines: 1
    }


    return (
        <Flex
            direction = {'row'}
        >
            <Avatar size = {'lg'}/>
            <Spacer/>
            {
                account.account ? 
                <Tooltip 
                    label = {hasCopied ? 'Copied' : 'Click to copy'}
                >
                    <Text
                        sx = {nameAccountTextStyle}
                        _hover = {{
                            textDecoration: 'underline'
                        }}
                        onClick = {onCopy}
                    >
                        {account.account}       
                    </Text>
                </Tooltip>
                :
                <Text
                    sx = {nameAccountTextStyle}
                >
                    {DEFAULT_ACCOUNT_NAME_VALUE}
                </Text>
            }
        </Flex>
    );
}



export default React.memo(Account);