import WalletConnect from '@walletconnect/client';
import * as React from 'react';
import useReloadElement from '../../../hooks/useReloadElement';



const DEFAULT_CONNECTOR_VALUE = null;



type Connector = WalletConnect | null
type AsyncVoidFunction = Promise<void>
type UseConnectorReturnValue = [connector: Connector, connect: ConnectToDApp, disconnect: DisconnectDApp]
type ConnectToDApp = (uri: string, account: string, chainId: number) => AsyncVoidFunction
type DisconnectDApp = () => AsyncVoidFunction



export default function useConnector(): UseConnectorReturnValue {

    const [connector, setConnector] = React.useState<WalletConnect | null>(DEFAULT_CONNECTOR_VALUE);
    const {reloadElement} = useReloadElement();


    React.useEffect(() => {

        let connector: any = localStorage.getItem('walletconnect');
        if(connector) {

            connector = JSON.parse(connector);
            connect(`wc:${connector.handshakeTopic}?bridge=${connector.bridge}&key=${connector.key}`, connector.accounts[0], connector.chainId);
        }
    }, []);

    const disconnect = React.useCallback(async () => {

        if(!connector) {
            console.log('connector equals to ' + connector);
            return;
        }

        await connector.killSession();
        setConnector(DEFAULT_CONNECTOR_VALUE);
    }, [connector]);

    const connect = async (uri: string, account: string, chainId: number) => {
        
        try {
            const connector = await new WalletConnect(
                {
                  // Required
                  uri: uri,
                  // Required
                  clientMeta: {
                    description: "Wallet Test App",
                    url: "localhost:3000",
                    icons: [],
                    name: "Wallet",
                  },
                }
            );
            
            subscribeToEvents(connector, account, chainId);
            
            if(connector.connected === false)
                await connector.createSession();
                
            setConnector(connector);
        }
        catch(error) {
            console.log(error);
            alert('Invalid URI format');
        }
        
    }

    const subscribeToEvents = (connector: WalletConnect, account: string, chainId: number) => {
  
        connector.on("session_request", async (error, payload) => {

            if (error) {
                throw error;
            }

            connector.approveSession({
                accounts: [account],
                chainId: chainId
            })
            
            reloadElement();
        });
        
        // Subscribe to call requests
        connector.on("call_request", (error, payload) => {

            if (error) {
                throw error;
            }

            alert(payload.method + ' works!');
            connector.rejectRequest({
                id: payload.id,
                error: {
                    message: 'It is only example test site'
                }
            });
        });
        
        connector.on("disconnect", (error, payload) => {
            
            if (error) {
                throw error;
            }
            
            setConnector(DEFAULT_CONNECTOR_VALUE);
        });
    }


    return [connector, connect, disconnect];
}
