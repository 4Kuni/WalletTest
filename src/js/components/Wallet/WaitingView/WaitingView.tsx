import { Flex, Spinner, Text } from "@chakra-ui/react";
import * as React from "react";
import { IProviderProps } from "../../../types/Types";

export default function WaitingView({ children }: IProviderProps): JSX.Element {
  return (
    <Flex direction={"row"} gap={5}>
      <Spinner size={"xl"} />
      <Text alignSelf={"center"}>{children}</Text>
    </Flex>
  );
}
