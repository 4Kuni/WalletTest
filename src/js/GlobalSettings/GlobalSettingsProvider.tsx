import * as React from "react";
import EthereumProvider from "../components/EthereumProvider/EthereumProvider";
import AccountProvider from "../components/AccountProvider/AccountProvider";
import useReloadElement from "../utils/Hooks/useReloadElement";
import {
  ConnectWay,
  Hardware,
  IGlobalSettingsProvider,
  IProviderProps,
  MainContent,
} from "../types/Types";
import AlertDialogErrorProvider from "../components/AlertDialogErrorProvider/AlertDialogErrorProvider";
import MetamaskProvider from "../components/ConnectMetamask/MetamaskProvider";

const DEFAULT_HARDWARE_TYPE = "windows";
const HARDWARE_TYPES: Hardware[] = ["iphone", "android", "windows", "mac"];
const DEFAULT_MAIN_CONTENT_VALUE: MainContent = "wallet";
let hardware: Hardware;

function isPhoneHardware(hardware: Hardware): boolean {
  return hardware === "android" || hardware === "iphone";
}

const DEFAULT_CONTEXT_VALUE: IGlobalSettingsProvider = {
  hardware: DEFAULT_HARDWARE_TYPE,
  isPhoneHardware,
  mainContent: "wallet",
  setMainContent: () => {},
  connectWay: { current: "" },
};

function detectHardware(): Hardware {
  const userAgent = window.navigator.userAgent.toLowerCase();

  for (let i = 0; i < HARDWARE_TYPES.length; i++) {
    if (userAgent.includes(HARDWARE_TYPES[i])) return HARDWARE_TYPES[i];
  }

  return DEFAULT_HARDWARE_TYPE;
}

export const GlobalSettingsContext =
  React.createContext<IGlobalSettingsProvider>(DEFAULT_CONTEXT_VALUE);

export default function GlobalSettingsProvider({
  children,
}: IProviderProps): JSX.Element {
  const [mainContent, setMainContent] = React.useState<MainContent>(
    DEFAULT_MAIN_CONTENT_VALUE
  );
  const { reloadElement } = useReloadElement();
  const connectWay = React.useRef<ConnectWay>("");

  React.useEffect(() => {
    hardware = detectHardware();
    reloadElement();
  }, []);

  return (
    <GlobalSettingsContext.Provider
      value={{
        hardware,
        isPhoneHardware,
        mainContent,
        setMainContent,
        connectWay,
      }}
    >
      <AlertDialogErrorProvider>
        <EthereumProvider>
          <AccountProvider>
            <MetamaskProvider>{children}</MetamaskProvider>
          </AccountProvider>
        </EthereumProvider>
      </AlertDialogErrorProvider>
    </GlobalSettingsContext.Provider>
  );
}
