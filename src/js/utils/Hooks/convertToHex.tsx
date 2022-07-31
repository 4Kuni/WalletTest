import * as React from 'react';
import { IDecToHex } from '../../types/Types';



const DEC_TO_HEX_TABLE: IDecToHex = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7, 
    '8': 8,
    '9': 9,
    '10': 'a',
    '11': 'b',
    '12': 'c',
    '13': 'd',
    '14': 'e',
    '15': 'f'
}



export default function convertToHex(number: number) {
    
    number = parseInt(`${number}`); // in case number is a float number
    
    const hexElements = new Array<number>();
    let hexResult = '0x';

    while(number > 0) {

        number /= 16;
        const remainder = number % 1;
        number -= remainder;

        hexElements.push(remainder * 16);
    }

    for(let i = hexElements.length - 1; i >= 0; i--) {

        hexResult += DEC_TO_HEX_TABLE[ `${hexElements[i]}` as keyof IDecToHex];
    }

    return hexResult;
} 