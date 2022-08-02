import detectEthereumProvider from "@metamask/detect-provider";
import * as React from "react";
import { ethereumProviderKey } from "../../assets/local_storage_keys";
import {
  IEthereumProvider,
  IProviderProps,
  IProvider,
} from "../../types/Types";

const DEFAULT_ETHEREUM_PROVIDER_VALUE: IEthereumProvider = {
  providerState: null,
  removeProvider: () => {},
  detectProvider: async () => false,
  forgetProvider: () => {},
  saveProvider: () => {},
};

function forgetProvider() {
  localStorage.removeItem(ethereumProviderKey);
}

function saveProvider() {
  localStorage.setItem(ethereumProviderKey, "provider_saved");
}

export const EthereumContext = React.createContext<IEthereumProvider>(
  DEFAULT_ETHEREUM_PROVIDER_VALUE
);

export default function EthereumProvider({ children }: IProviderProps) {
  const [providerState, setProviderState] = React.useState<IProvider | null>(
    null
  );

  const detectProvider = React.useCallback(async (): Promise<boolean> => {
    const ethereum = await detectEthereumProvider();

    if (!ethereum) {
      console.error("You have to download metamask");
      return false;
    }

    const provider: IProvider = ethereum as IProvider;
    setProviderState(provider);
    //provider === window.ethereum
    return true;
  }, []);

  const removeProvider = () => {
    setProviderState(null);
  };

  React.useEffect(() => {
    const provider = localStorage.getItem(ethereumProviderKey);
    if (provider) {
      detectProvider();
    }
  }, [detectProvider]);

  return (
    <EthereumContext.Provider
      value={{
        providerState,
        removeProvider,
        detectProvider,
        forgetProvider,
        saveProvider,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
}
