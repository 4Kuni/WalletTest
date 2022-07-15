import { 
    extendTheme 
} from '@chakra-ui/react';
import * as React from 'react';


const extension = {
    semanticTokens: {
        colors: {
            dAppWindowBorder: {
                default: 'black',
                _dark: 'white'   
            },
            positiveButton: {
                default: '#FFB947',
                _dark: '#B376E5'
            },
            negativeButton: {
                default: '#FFA91F',
                _dark: '#9D4EDD'
            },
            defaultReverse: {
                default: 'white',
                _dark: 'black'
            },
            sideBarBackground: {
                default: '#FF7900',
                _dark: '#240046'
            },
            walletBackground: {
                default: '#F2F2F2',
                _dark: '#F9D79F'
            },
            alertDialogWindow: {
                default: '#FFC870',
                _dark: '#CFA9EF'
            }
        }
    }
}

const theme = extendTheme(extension);

export default theme;

