import * as React from "react";

export interface IProvider {
  request: ethRequest;
  on: ethOnOff;
  off: ethOnOff;
}

type ethOnOff = (
  event: string,
  callback: ((accounts: string[]) => void) | (() => void)
) => void;

type ethRequest = (args: IEthRequestArguments) => Promise<any>;

interface IEthRequestArguments {
  method: string;
  params?: any[] | Object;
}

export interface IEthereumProvider {
  providerState: IProvider | null;
  removeProvider: () => void;
  detectProvider: () => Promise<boolean>;
  forgetProvider: () => void;
  saveProvider: () => void;
}

export interface IAccount {
  account: string | null;
  chainId: number | null;
  balance: number | null;
  icon: string | null;
}

export interface IAccountProvider {
  account: IAccount;
  setAccount: React.Dispatch<React.SetStateAction<IAccount>>;
}

export interface IMetamaskProvider {
  disconnectDapp: {
    current: (() => void) | null;
  };
  onDisconnect: () => void;
  changeChain: (chainId: string) => Promise<boolean> | void;
  updateAccountData: (accountName: string) => void;
  connectMetamask: (
    callback: (isProviderDetected: boolean) => void
  ) => Promise<void> | void;
}

export interface IGlobalSettingsProvider {
  hardware: Hardware;
  isPhoneHardware: (hardware: Hardware) => boolean;
  setMainContent: React.Dispatch<React.SetStateAction<MainContent>>;
  mainContent: MainContent;
  connectWay: React.MutableRefObject<ConnectWay>;
}

export interface IAccountContentProps {
  setIsAccountModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConnectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IConnectWalletContentProps {
  setIsAccountModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConnectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IProviderProps extends IHasChildrenProps {}

export interface IHasChildrenProps {
  children: React.ReactNode;
}

export interface IAlertDialogMetamaskProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ISideBarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IBalanceViewProps {
  accountBalance: number;
}

export interface IExchange {
  BTC: number;
  USD: number;
  EUR: number;
}

export type Hardware = HardwarePhone | "windows" | "mac";
export type HardwarePhone = "iphone" | "android";

export type MainContent = "transactions" | "wallet";

export interface IDecToHex {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
  "8": number;
  "9": number;
  "10": string;
  "11": string;
  "12": string;
  "13": string;
  "14": string;
  "15": string;
}

export interface INetworksByName {
  EthereumRopsten: number;
  Celo: number;
  Polygon: number;
  Optimism: number;
  Arbitrum: number;
}

export interface INetworksByChainId {
  "3": string;
  "42220": string;
  "137": string;
  "10": string;
  "42161": string;
}

export interface IRpcUrlsByNetwork {
  EthereumRopsten: string;
  Celo: string;
  Polygon: string;
  Optimism: string;
  Arbitrum: string;
}

export interface IImagesByNetwork {
  EthereumRopsten: string;
  Celo: string;
  Polygon: string;
  Optimism: string;
  Arbitrum: string;
}

export interface IAlertDialogErrorProvider {
  alertDialogError: (
    header: string,
    alertMessage: string,
    buttonMessage: string
  ) => void;
}

export type ConnectWay = "metamask" | "walletconnect" | "";

export interface INewBlockInfo {
  filterId: string | null;
  hashes: string[];
}

export interface IExchangeUpdaterProps {
  setExchange: React.Dispatch<React.SetStateAction<IExchange | null>>;
}
