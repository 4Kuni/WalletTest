import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import useGlobalSettings from "../../../GlobalSettings/useGlobalSettings";
import { IAlertDialogMetamaskProps } from "../../../types/Types";

function AlertDialogMetamask({
  isOpen,
  onClose,
}: IAlertDialogMetamaskProps): JSX.Element {
  const downloadRef = React.useRef<any>();
  const { isPhoneHardware, hardware } = useGlobalSettings();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={downloadRef}
      onClose={onClose}
      size={isPhoneHardware(hardware) ? "3xl" : "xl"}
    >
      <AlertDialogOverlay />
      <AlertDialogContent
        height={isPhoneHardware(hardware) ? "300px" : "200px"}
        bg={"alertDialogWindow"}
      >
        <AlertDialogHeader fontSize={isPhoneHardware(hardware) ? 40 : 20}>
          Metamask is missing!
        </AlertDialogHeader>
        <AlertDialogBody fontSize={isPhoneHardware(hardware) ? 30 : 15}>
          {isPhoneHardware(hardware) ? (
            <Text>
              Please, open your Metamask app and go to this site by browser in
              the app
            </Text>
          ) : (
            <Text>You have to download Metamask to your chrome browser!</Text>
          )}
        </AlertDialogBody>
        <AlertDialogFooter>
          <LinkBox>
            <Button
              onClick={onClose}
              bg={"positiveButton"}
              ref={downloadRef}
              fontSize={isPhoneHardware(hardware) ? 30 : 15}
            >
              {isPhoneHardware(hardware) ? (
                <Text p={7}>Okey!</Text>
              ) : (
                <LinkOverlay
                  isExternal
                  href={
                    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                  }
                >
                  Download Metamask
                </LinkOverlay>
              )}
            </Button>
          </LinkBox>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default React.memo(AlertDialogMetamask);
