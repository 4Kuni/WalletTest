import * as React from 'react';
import { EthereumContext } from './EthereumProvider';



export default function useEthereumProvider() {

    const ethProvider = React.useContext(EthereumContext)

    return ethProvider;
}