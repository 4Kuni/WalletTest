import { useMediaQuery } from '@chakra-ui/react';
import * as React from 'react';
import EthereumProvider from '../components/EthereumProvider/EthereumProvider';
import AccountProvider from '../components/SideBar/Account/AccountProvider';
import useReloadElement from '../hooks/useReloadElement';
import { Hardware, IGlobalSettingsProvider, IProviderProps, MainContent } from '../types/Types';



const DEFAULT_HARDWARE_TYPE = 'windows';
const HARDWARE_TYPES: Hardware[] = ['iphone', 'android', 'windows', 'mac'];
const DEFAULT_MAIN_CONTENT_VALUE: MainContent = 'wallet';
let hardware: Hardware;

function isPhoneHardware(hardware: Hardware): boolean {
    const f = (hardware === 'android' || hardware === 'iphone');
    return f;
}

const DEFAULT_CONTEXT_VALUE: IGlobalSettingsProvider = {
    hardware: DEFAULT_HARDWARE_TYPE,
    isPhoneHardware,
    mainContent: 'wallet',
    setMainContent: () => {}
}

function detectHardware(): Hardware {

    const userAgent = window.navigator.userAgent.toLowerCase();

    for(let i = 0; i < HARDWARE_TYPES.length; i++) {

        if(userAgent.includes(HARDWARE_TYPES[i])) return HARDWARE_TYPES[i];
    }

    return DEFAULT_HARDWARE_TYPE;
}

export const GlobalSettingsContext = React.createContext<IGlobalSettingsProvider>(DEFAULT_CONTEXT_VALUE);



export default function GlobalSettingsProvider({children}: IProviderProps): JSX.Element {

    const [mainContent, setMainContent] = React.useState<MainContent>(DEFAULT_MAIN_CONTENT_VALUE);
    const {reloadElement} = useReloadElement();

    React.useEffect(() => {
        
        hardware = detectHardware();
        reloadElement();
    }, []);


    return (
        <GlobalSettingsContext.Provider value = {{hardware, isPhoneHardware, mainContent, setMainContent}}>
            <EthereumProvider>
                <AccountProvider>
                    {children}
                </AccountProvider>
            </EthereumProvider>
        </GlobalSettingsContext.Provider>
    );
}