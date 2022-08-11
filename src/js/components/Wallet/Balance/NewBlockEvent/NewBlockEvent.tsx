import * as React from "react";
import useAccount from "../../../AccountProvider/useAccount";
import useMetamask from "../../../ConnectMetamask/useMetamask";
import useEthereumProvider from "../../../EthereumProvider/useEthereumProvider";
import { INewBlockInfo } from "../../../../types/Types";

const DEFAULT_NEW_BLOCK_INFO_VALUE: INewBlockInfo = {
  filterId: "",
  hashes: [],
};

function NewBlockEvent(): JSX.Element {
  const newBlockInfo = React.useRef<INewBlockInfo>(
    DEFAULT_NEW_BLOCK_INFO_VALUE
  );
  const { providerState } = useEthereumProvider();
  const { account } = useAccount();
  const { updateAccountData } = useMetamask();
  const [updater, setUpdater] = React.useState<boolean>(false);

  const isBlockChanged = (hashes: string[]) => {
    if (hashes.length > 0) {
      // block has been changed
      updateAccountData(account.account!);
      newBlockInfo.current.hashes = hashes;
      console.log("update");
    }
  };

  React.useEffect(() => {
    const filterId = newBlockInfo.current.filterId;

    if (!filterId) return;

    providerState!
      .request({ method: "eth_getFilterChanges", params: [filterId] })
      .then((hashes) => {
        isBlockChanged(hashes);
      })
      .catch((error) => console.log(error));

    if (account.account)
      setTimeout(() => setUpdater((previous) => (previous = !previous)), 500);
  }, [updater]);

  React.useEffect(() => {
    if (account.account === null) return;

    providerState!
      .request({ method: "eth_newBlockFilter" })
      .then((filterId: string) => {
        newBlockInfo.current.filterId = filterId;

        setUpdater((previous) => (previous = !previous));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [account.account]);

  return <></>;
}

export default React.memo(NewBlockEvent);
