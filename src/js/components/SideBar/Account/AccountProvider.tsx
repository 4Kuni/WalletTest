import * as React from 'react';
import { 
    IProviderProps,
    IAccountProvider,
    IAccount
 } from '../../../types/Types';
import useEthereumProvider from '../../EthereumProvider/useEthereumProvider';



const DEFAULT_ACCOUNT_VALUE: IAccount = {
    account: null,
    chainId: null,
    balance: null,
    icon: null
}

const DEFAULT_ACCOUNT_CONTEXT_VALUE: IAccountProvider = {
    account: DEFAULT_ACCOUNT_VALUE,
    disconnectDapp: {
        current: null
    },
    onDisconnect: () => {}
};



export const AccountContext = React.createContext<IAccountProvider>(DEFAULT_ACCOUNT_CONTEXT_VALUE);



function parseEth(eth: string): number {

    return parseInt(eth)/10**18;
}



export default function AccountProvider({children}: IProviderProps) {

    const {providerState, removeProvider, forgetProvider, saveProvider} = useEthereumProvider();
    const [account, setAccount] = React.useState<IAccount>(DEFAULT_ACCOUNT_VALUE);
    const disconnectDapp = React.useRef<(() => void) | null>(null);


    const onDisconnect = (): void => {
        
        if(disconnectDapp.current !== null) disconnectDapp.current();
        forgetProvider();
        removeProvider();
        setAccount(DEFAULT_ACCOUNT_VALUE)
    }


    React.useEffect(() => {

        const setDataAccount = (accountName: string) => {

            saveProvider();
            let acc: IAccount = {...account, account: accountName} 
        
            providerState!.request({method: 'eth_getBalance', params: [accountName, 'latest']})
                .then((result: string) => {

                const balance = parseEth(result);
                acc = {...acc, balance} 
        
                providerState!.request({method: 'eth_chainId'})
                .then((result: string) => {

                    const chainId = parseInt(result);
                    acc = {...acc, chainId}

                    setAccount(acc);
                })
            });
        }

        const onAccountChanged = (accounts: string[]): void => {

            if(accounts.length === 0) {

                onDisconnect();
                return;
            }

            setDataAccount(accounts[0]);
        }
        
        const onConnect = async (): Promise<void> => {

            const changedAccount: string[] = await providerState!.request({method: 'eth_requestAccounts'});
            setDataAccount(changedAccount[0]);
        }

        const subscribeEvents = async (): Promise<void> => {

            await providerState!.on('accountsChanged', onAccountChanged);
            await providerState!.on('connect', onConnect);
            await providerState!.on('disconnect', onDisconnect);
        }
        
        const onProviderChanged = async () => {

            if(providerState) {
                
                await subscribeEvents();
                providerState.request({method: 'eth_requestAccounts'})
                .catch(error => {

                    if(error.code === 4001) {
                        onDisconnect();
                    }
                });
            }
        }
    
        onProviderChanged();
    }, [providerState]);


    return (
        <AccountContext.Provider value = {{account, disconnectDapp, onDisconnect}}>
            {children}
        </AccountContext.Provider>
    );
}