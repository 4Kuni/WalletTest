import * as React from "react";
import useGlobalSettings from "../../GlobalSettings/useGlobalSettings";
import {
  IProviderProps,
  IAccount,
  INetworksByChainId,
  IRpcUrlsByNetwork,
  IMetamaskProvider,
} from "../../types/Types";
import {
  NETWORKS_BY_CHAIN_ID,
  RPC_URLS_BY_NETWORK,
} from "../../utils/Networks/networks";
import useAccount from "../AccountProvider/useAccount";
import useAlertDialogError from "../AlertDialogErrorProvider/useAlertDialogError";
import useEthereumProvider from "../EthereumProvider/useEthereumProvider";

const DEFAULT_ACCOUNT_VALUE: IAccount = {
  account: null,
  chainId: null,
  balance: null,
  icon: null,
};

const DEFAULT_ACCOUNT_CONTEXT_VALUE: IMetamaskProvider = {
  disconnectDapp: {
    current: null,
  },
  onDisconnect: () => {},
  changeChain: (chainId) => {},
  updateAccountData: () => {},
  connectMetamask: () => {},
};

export const MetamaskContext = React.createContext<IMetamaskProvider>(
  DEFAULT_ACCOUNT_CONTEXT_VALUE
);

function parseEth(eth: string): number {
  return parseInt(eth) / 10 ** 18;
}

export default function MetamaskProvider({ children }: IProviderProps) {
  const {
    providerState,
    removeProvider,
    forgetProvider,
    saveProvider,
    detectProvider,
  } = useEthereumProvider();
  const { account, setAccount } = useAccount();
  const disconnectDapp = React.useRef<(() => void) | null>(null);
  const { setMainContent, connectWay } = useGlobalSettings();
  const { alertDialogError } = useAlertDialogError();

  const onDisconnect = (): void => {
    if (disconnectDapp.current !== null) disconnectDapp.current();
    forgetProvider();
    removeProvider();
    setMainContent("wallet");
    connectWay.current = "";
    setAccount(DEFAULT_ACCOUNT_VALUE);
  };

  const connectMetamask = React.useCallback(
    async (callback: (isProviderDetected: boolean) => void) => {
      if (providerState) return;

      const isProviderDetected = await detectProvider();

      callback(isProviderDetected);
    },
    [providerState]
  );

  const updateAccountData = (accountName: string) => {
    let acc: IAccount = { ...account, account: accountName };

    providerState!
      .request({ method: "eth_getBalance", params: [accountName, "latest"] })
      .then((result: string) => {
        const balance = parseEth(result);
        acc = { ...acc, balance };

        providerState!
          .request({ method: "eth_chainId" })
          .then((result: string) => {
            const chainId = parseInt(result);
            acc = { ...acc, chainId };

            setAccount(acc);
          });
      });
  };

  const changeChain = async (chainId: string) => {
    if (!providerState) {
      console.log("providerState equals to " + providerState);
      return false;
    }

    await providerState!
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      })
      .then((result) => {
        console.log(result);
      })
      .catch(async (error) => {
        if (error.code === -32002) {
          alert("You have already made a request, please complete it");
          return false;
        } else if (error.code === 4902) {
          const integerChainId = parseInt(chainId).toString();
          const network =
            NETWORKS_BY_CHAIN_ID[integerChainId as keyof INetworksByChainId];

          await providerState!
            .request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: chainId,
                  chainName: network,
                  rpcUrls: [
                    RPC_URLS_BY_NETWORK[network as keyof IRpcUrlsByNetwork],
                  ],
                },
              ],
            })
            .then((result) => {
              return true;
            })
            .catch((error) => {
              return false;
            });
        }

        return false;
      });

    return true;
  };

  React.useEffect(() => {
    const setDataAccount = (accountName: string) => {
      saveProvider();
      setMainContent("wallet");

      updateAccountData(accountName);
    };

    const onAccountChanged = (accounts: string[]): void => {
      if (accounts.length === 0) {
        onDisconnect();
        return;
      }

      setDataAccount(accounts[0]);
    };

    const onConnect = async (): Promise<void> => {
      const changedAccount: string[] = await providerState!.request({
        method: "eth_requestAccounts",
      });
      setDataAccount(changedAccount[0]);
    };

    const subscribeEvents = async (): Promise<void> => {
      await providerState!.on("chainChanged", onConnect);
      await providerState!.on("accountsChanged", onAccountChanged);
      await providerState!.on("connect", onConnect);
      await providerState!.on("disconnect", onDisconnect);
    };

    const onProviderChanged = async () => {
      if (providerState) {
        await subscribeEvents();

        providerState
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            if (result.length !== 0) setDataAccount(result[0]);
          })
          .then(() => {
            connectWay.current = "metamask";
          })
          .catch((error) => {
            if (error.code === 4001) {
              onDisconnect();
              alertDialogError(
                "Error connecting",
                "The connection attempt failed. Please try to connect in your wallet.",
                "Try again"
              );
            }
          });
      }
    };

    onProviderChanged();
  }, [providerState]);

  return (
    <MetamaskContext.Provider
      value={{
        disconnectDapp,
        onDisconnect,
        changeChain,
        updateAccountData,
        connectMetamask,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
}
