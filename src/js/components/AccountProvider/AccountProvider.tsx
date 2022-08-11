import * as React from "react";
import { IProviderProps, IAccountProvider, IAccount } from "../../types/Types";

const DEFAULT_ACCOUNT_VALUE: IAccount = {
  account: null,
  chainId: null,
  balance: null,
  icon: null,
};

const DEFAULT_ACCOUNT_CONTEXT_VALUE: IAccountProvider = {
  account: DEFAULT_ACCOUNT_VALUE,
  setAccount: () => {},
};

export const AccountContext = React.createContext<IAccountProvider>(
  DEFAULT_ACCOUNT_CONTEXT_VALUE
);

export default function AccountProvider({ children }: IProviderProps) {
  const [account, setAccount] = React.useState<IAccount>(DEFAULT_ACCOUNT_VALUE);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
}
