import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Text,
  Spacer,
  AccordionIcon,
  AccordionPanel,
  Button,
  Flex,
  Box,
  Icon,
} from "@chakra-ui/react";
import * as React from "react";
import useGlobalSettings from "../../../GlobalSettings/useGlobalSettings";
import { INetworksByChainId, INetworksByName } from "../../../types/Types";
import convertToHex from "../../../utils/Hooks/convertToHex";
import {
  NETWORKS_BY_CHAIN_ID,
  NETWORKS_BY_NAME,
} from "../../../utils/Networks/networks";
import useAccount from "../Account/useAccount";

const networkWindowStyle = {
  p: 2,
  borderTop: "1px",
  borderColor: "dAppWindowBorder",
  flexDirection: "column",
  gap: 2,
};

function NetworkSelector(): JSX.Element {
  const { isPhoneHardware, hardware } = useGlobalSettings();
  const { account, changeChain } = useAccount();

  const textStyle = {
    fontSize: isPhoneHardware(hardware) ? "30px" : "20px",
  };

  const buttonStyle = {
    color: "defaultReverse",
    variant: "solid",
    height: isPhoneHardware(hardware) ? "70px" : "47px",
  };

  const currentChain =
    account.account === null || account.chainId == null
      ? "Select Network"
      : NETWORKS_BY_CHAIN_ID[`${account.chainId}` as keyof INetworksByChainId];

  return (
    <Accordion borderColor={"dAppWindowBorder"} allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Text sx={textStyle}>{currentChain}</Text>
          <Spacer />
          <AccordionIcon
            boxSize={isPhoneHardware(hardware) ? "37.5px" : "25px"}
          />
        </AccordionButton>

        <AccordionPanel p={0}>
          {account.account !== null && account.chainId !== null ? (
            <Flex sx={networkWindowStyle}>
              {Object.keys(NETWORKS_BY_NAME).map((element) => (
                <Button
                  key={element}
                  sx={{ ...textStyle, ...buttonStyle }}
                  bg={"positiveButton"}
                  onClick={() =>
                    changeChain(
                      convertToHex(
                        NETWORKS_BY_NAME[element as keyof INetworksByName]
                      )
                    )
                  }
                >
                  {element}
                </Button>
              ))}
            </Flex>
          ) : (
            <Flex
              minHeight={"100px"}
              direction={"row"}
              width={"100%"}
              gap={2}
              px={5}
            >
              <Box sx={textStyle} alignSelf={"center"}>
                Please, connect in your wallet
              </Box>
              <Spacer />
              <Icon
                boxSize={isPhoneHardware(hardware) ? "30px" : "20px"}
                alignSelf={"center"}
              />
            </Flex>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default React.memo(NetworkSelector);
