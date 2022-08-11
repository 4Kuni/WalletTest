import { Image, useColorMode } from "@chakra-ui/react";
import * as React from "react";
import blackLogo from "../../../assets/black_logo";
import whiteLogo from "../../../assets/white_logo.svg";
import useGlobalSettings from "../../../GlobalSettings/useGlobalSettings";

function Logo(): JSX.Element {
  const { hardware, isPhoneHardware } = useGlobalSettings();
  const { colorMode } = useColorMode();

  return (
    <Image
      width={isPhoneHardware(hardware) ? "75px" : "50px"}
      src={colorMode === "light" ? blackLogo : whiteLogo}
    />
  );
}

export default React.memo(Logo);
