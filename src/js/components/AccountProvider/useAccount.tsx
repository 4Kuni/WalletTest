import * as React from "react";
import { AccountContext } from "./AccountProvider";

export default function useAccount() {
  const contextValue = React.useContext(AccountContext);

  return contextValue;
}
