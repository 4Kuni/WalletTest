import { Flex, Spacer, Square, Box } from "@chakra-ui/react";
import * as React from "react";
import useEthereumProvider from "../EthereumProvider/useEthereumProvider";
import useAccount from "../AccountProvider/useAccount";
import BalanceView from "./Balance/BalanceView";
import Exchange from "./Exchange/Exchange";
import WaitingView from "./WaitingView/WaitingView";

const squareSizeStyle = {
  minWidth: "100%",
  minHeight: "100%",
};

function Wallet(): JSX.Element {
  const { providerState } = useEthereumProvider();
  const { account } = useAccount();

  return providerState ? (
    account.account !== null && account.balance !== null ? (
      <Flex direction={"column"} width={"100%"} mx={10}>
        <Box opacity={1}>
          <Exchange />
        </Box>
        <Spacer />
        <BalanceView accountBalance={account.balance} />
      </Flex>
    ) : (
      <Square sx={squareSizeStyle}>
        <WaitingView>Please, wait for data confirmation</WaitingView>
      </Square>
    )
  ) : (
    <Square sx={squareSizeStyle} fontSize={"32px"}>
      Connect your wallet
    </Square>
  );
}

export default React.memo(Wallet);
