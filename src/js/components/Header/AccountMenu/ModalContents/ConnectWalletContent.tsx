import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Text,
  Button,
  Image,
  IconButton,
  Box,
  Spinner,
  Center,
} from "@chakra-ui/react";
import * as React from "react";
import useGlobalSettings from "../../../../GlobalSettings/useGlobalSettings";
import { IConnectWalletContentProps } from "../../../../types/Types";
import useAccount from "../../../AccountProvider/useAccount";
import useMetamask from "../../../ConnectMetamask/useMetamask";
import useEthereumProvider from "../../../EthereumProvider/useEthereumProvider";
import AlertDialogMetamask from "../../../Wallet/AlertDialogMetamask/AlertDialogMetamask";

function ConnectWalletContent({
  setIsConnectModalOpen,
  setIsAccountModalOpen,
}: IConnectWalletContentProps): JSX.Element {
  const { hardware, isPhoneHardware, connectWay } = useGlobalSettings();
  const { providerState } = useEthereumProvider();
  const { connectMetamask } = useMetamask();
  const { account } = useAccount();
  const [isConnecting, setIsConnecting] = React.useState<boolean>(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] =
    React.useState<boolean>(false);

  const onCloseAlertDialog = React.useCallback(() => {
    setIsAlertDialogOpen(false);
    setIsConnecting(false);
  }, []);

  const onMetamask = async () => {
    if (providerState) return;

    setIsConnecting((previous) => (previous = true));

    await connectMetamask((isProviderDetected: boolean) => {
      if (isProviderDetected === false) {
        setIsAlertDialogOpen(true);
        return;
      }
    });
  };

  const turnOffConnecting = () => {
    if (isConnecting === false) return;

    setIsConnecting((previous) => (previous = false));
    setIsAccountModalOpen((previous) => (previous = true));
    setIsConnectModalOpen((previous) => (previous = false));
  };

  React.useEffect(() => {
    if (providerState === null) {
      setIsConnecting((previous) => (previous = false));
      return;
    }

    if (account.account === null) {
      setIsConnecting((previous) => (previous = true));
      return;
    }

    turnOffConnecting();
  }, [providerState]);

  React.useEffect(() => {
    if (account.account === null) return;

    turnOffConnecting();
  }, [account]);

  return (
    <ModalContent alignSelf={"center !important"}>
      <ModalHeader fontSize={isPhoneHardware(hardware) ? "30px" : "20px"}>
        {isConnecting ? (
          <></>
        ) : account.account ? (
          <IconButton
            aria-label={"back to account info"}
            icon={
              <ArrowBackIcon
                boxSize={isPhoneHardware(hardware) ? "36px" : "24px"}
                onClick={() => {
                  setIsAccountModalOpen((previous) => (previous = true));
                  setIsConnectModalOpen((previous) => (previous = false));
                }}
              />
            }
          />
        ) : (
          "Connect a wallet"
        )}
      </ModalHeader>
      <ModalCloseButton boxSize={isPhoneHardware(hardware) ? "60px" : "40px"} />
      <ModalBody>
        {isConnecting ? (
          <Center flexDirection={"column"} gap={5}>
            <Spinner size={isPhoneHardware(hardware) ? "xl" : "md"} />
            <Box
              textAlign={"center"}
              fontSize={isPhoneHardware(hardware) ? "30px" : "20px"}
            >
              Connecting...
            </Box>
          </Center>
        ) : (
          <Flex direction={"column"}>
            <Button
              borderRadius={20}
              onClick={onMetamask}
              h={isPhoneHardware(hardware) ? "87px" : "58px"}
            >
              <Flex
                direction={"row"}
                width={"100%"}
                gap={4}
                alignItems={"center"}
              >
                {connectWay.current === "metamask" ? (
                  <CheckCircleIcon
                    color={"green"}
                    boxSize={isPhoneHardware(hardware) ? "12px" : "8px"}
                  />
                ) : (
                  <></>
                )}

                <Text fontSize={isPhoneHardware(hardware) ? "24px" : "16px"}>
                  MetaMask
                </Text>
                <Spacer />
                <Image
                  boxSize={isPhoneHardware(hardware) ? "36px" : "24px"}
                  src={
                    "https://app.uniswap.org/static/media/metamask.02e3ec27.png"
                  }
                />
              </Flex>
            </Button>
          </Flex>
        )}
      </ModalBody>
      <ModalFooter />
      <AlertDialogMetamask
        isOpen={isAlertDialogOpen}
        onClose={onCloseAlertDialog}
      />
    </ModalContent>
  );
}

export default React.memo(ConnectWalletContent);
