import * as React from 'react';
import { MetamaskContext } from './MetamaskProvider';



export default function useMetamask() {

    const contextValue = React.useContext(MetamaskContext)
    
    return contextValue;
}