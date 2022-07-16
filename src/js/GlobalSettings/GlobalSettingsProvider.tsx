import { useMediaQuery } from '@chakra-ui/react';
import * as React from 'react';
import EthereumProvider from '../components/EthereumProvider/EthereumProvider';
import AccountProvider from '../components/SideBar/Account/AccountProvider';
import { Hardware, IGlobalSettingsProvider, IProviderProps } from '../types/Types';



const DEFAULT_HARDWARE_TYPE = 'windows'
const hardwareTypes: Hardware[] = ['iphone', 'android', 'windows'];
let hardware: Hardware;

const isPhoneHardware = (hardware: Hardware): boolean => {

    return hardware === 'android' || hardware === 'iphone';
}

const DEFAULT_CONTEXT_VALUE: IGlobalSettingsProvider = {
    hardware: DEFAULT_HARDWARE_TYPE,
    isPortraitOrientation: false,
    isPhoneHardware
}

export const GlobalSettingsContext = React.createContext<IGlobalSettingsProvider>(DEFAULT_CONTEXT_VALUE);


const detectHardware = (): Hardware => {

    const userAgent = window.navigator.userAgent.toLowerCase();

    for(let i = 0; i < hardwareTypes.length; i++) {

        if(userAgent.includes(hardwareTypes[i])) return hardwareTypes[i];
    }

    return DEFAULT_HARDWARE_TYPE;
}



export default function GlobalSettingsProvider({children}: IProviderProps): JSX.Element {

    const [isPortraitOrientation] = useMediaQuery(['(orientation: portrait)']);


    React.useEffect(() => {

        hardware = detectHardware();
    }, []);


    return (
        <GlobalSettingsContext.Provider value = {{isPortraitOrientation, hardware, isPhoneHardware}}>
            <EthereumProvider>
                <AccountProvider>
                    {children}
                </AccountProvider>
            </EthereumProvider>
        </GlobalSettingsContext.Provider>
    );
}