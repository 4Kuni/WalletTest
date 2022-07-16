import * as React from 'react';

export interface IProvider {

    request: ethRequest
    on: ethOnOff
    off: ethOnOff
}

type ethOnOff = (event: string, callback: ((accounts: string[]) => void) | (() => void)) => void;
  
type ethRequest = (args: IEthRequestArguments) => Promise<any>

interface IEthRequestArguments {
    
    method: string
    params?: any[] | Object
}

export interface IEthereumProvider {

    providerState: IProvider | null
    removeProvider: (() => void)
    detectProvider: (() => Promise<boolean>)
    forgetProvider: (() => void)
    saveProvider: (() => void)
}

export interface IAccount {
    account: string | null
    chainId: number | null
    balance: number | null
    icon: string | null
}

export interface IAccountProvider {
    account: IAccount
    disconnectDapp: {
        current: (() => void) | null
    }
    onDisconnect: () => void
}

export interface IGlobalSettingsProvider {
    isPortraitOrientation: boolean
    hardware: Hardware
    isPhoneHardware: (hardware: Hardware) => boolean
}

export interface IProviderProps extends IHasChildrenProps { }

export interface IHasChildrenProps {
    children: React.ReactNode
}

export interface IAlertDialogMetamaskProps {
    isOpen: boolean
    onClose: () => void
}

export interface ISideBarDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export interface IBalanceViewProps {
    accountBalance: number
}

export interface IExchange {
    BTC: number
    USD: number
    EUR: number
} 

export type Hardware = HardwarePhone | 'windows';
export type HardwarePhone = 'iphone' | 'android';