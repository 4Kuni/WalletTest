import {
  Avatar,
  Box,
  Flex,
  Image,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import * as React from "react";
import useGlobalSettings from "../../../GlobalSettings/useGlobalSettings";
import useAccount from "./useAccount";

const DEFAULT_ACCOUNT_NAME_VALUE = "account";

function Account() {
  const { account } = useAccount();
  const copyValue: string = account.account
    ? account.account
    : DEFAULT_ACCOUNT_NAME_VALUE;
  const { onCopy, hasCopied } = useClipboard(copyValue);
  const { isPhoneHardware, hardware } = useGlobalSettings();

  const nameAccountTextStyle = {
    maxWidth: isPhoneHardware(hardware) ? "300px" : "150px",
    noOfLines: 1,
  };

  return (
    <Flex direction={"row"}>
      <LinkBox>
        <LinkOverlay isExternal href={"https://www.guy-avraham.com/"} />
        <Image
          width={isPhoneHardware(hardware) ? "75px" : "50px"}
          src={
            "https://www.guy-avraham.com/_next/static/media/logo.ee7c8012.svg"
          }
        />
      </LinkBox>
      <Spacer />
      <Box
        alignSelf={"center"}
        fontSize={isPhoneHardware(hardware) ? "30px" : "20px"}
      >
        {account.account ? (
          <Tooltip label={hasCopied ? "Copied" : "Click to copy"}>
            <Text
              sx={nameAccountTextStyle}
              _hover={{
                textDecoration: "underline",
              }}
              onClick={onCopy}
            >
              {account.account}
            </Text>
          </Tooltip>
        ) : (
          <Text sx={nameAccountTextStyle}>{DEFAULT_ACCOUNT_NAME_VALUE}</Text>
        )}
      </Box>
    </Flex>
  );
}

export default React.memo(Account);
