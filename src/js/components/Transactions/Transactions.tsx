import {
  Heading,
  Square,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import * as React from "react";
import useGlobalSettings from "../../GlobalSettings/useGlobalSettings";
import useAccount from "../AccountProvider/useAccount";
import getTransactions from "./getTransactions";

function convertToNormalDate(timeStamp: number) {
  return new Date(timeStamp * 1000).toString();
}

function ethParse(value: number) {
  return value / 10 ** 18;
}

function Transactions(): JSX.Element {
  const [transactions, setTransactions] = React.useState<any[] | null>(null);
  const { hardware, isPhoneHardware } = useGlobalSettings();
  const { account } = useAccount();

  const thStyle = {
    fontSize: isPhoneHardware(hardware) ? "30px" : "20px",
  };

  React.useEffect(() => {
    if (!account.account) return;

    getTransactions(account.account).then((transactionsInfo) => {
      if (transactionsInfo.status === "0") return;

      setTransactions(transactionsInfo.result);
    });
  }, []);

  return transactions ? (
    <Square minW={"100%"} minH={"100%"}>
      <TableContainer w={"100%"}>
        <Table variant={"striped"} colorScheme={"orange"}>
          <TableCaption>All your transactions</TableCaption>
          <Thead>
            <Tr>
              <Th sx={thStyle}>Txn Hash</Th>
              <Th sx={thStyle}>From</Th>
              <Th sx={thStyle}>To</Th>
              <Th sx={thStyle}>Date</Th>
              <Th sx={thStyle} isNumeric>
                Amount
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {transactions.map((transaction) => (
              <Tr
                key={transaction.hash}
                h={isPhoneHardware(hardware) ? 220 : 120}
              >
                <Td>
                  <Tooltip label={transaction.hash} placement={"bottom-start"}>
                    <Text
                      maxW={"100px"}
                      noOfLines={1}
                      display={"block !important"}
                      fontWeight={"bold"}
                    >
                      {transaction.hash}
                    </Text>
                  </Tooltip>
                </Td>
                <Td>
                  <Tooltip label={transaction.from}>
                    <Text
                      maxW={"100px"}
                      noOfLines={1}
                      display={"block !important"}
                      fontWeight={"bold"}
                    >
                      {transaction.from}
                    </Text>
                  </Tooltip>
                </Td>
                <Td>
                  <Tooltip label={transaction.to}>
                    <Text
                      maxW={"100px"}
                      noOfLines={1}
                      display={"block !important"}
                      fontWeight={"bold"}
                    >
                      {transaction.to}
                    </Text>
                  </Tooltip>
                </Td>
                <Td>
                  <Tooltip label={convertToNormalDate(transaction.timeStamp)}>
                    <Text
                      maxW={"100px"}
                      noOfLines={1}
                      display={"block !important"}
                      fontWeight={"bold"}
                    >
                      {convertToNormalDate(transaction.timeStamp)}
                    </Text>
                  </Tooltip>
                </Td>
                <Td isNumeric>
                  <Tooltip
                    label={ethParse(transaction.value)}
                    placement={"bottom-end"}
                  >
                    <Text
                      maxW={"100px"}
                      noOfLines={1}
                      display={"block !important"}
                      fontWeight={"bold"}
                      textAlign={"end"}
                    >
                      {ethParse(transaction.value)}
                    </Text>
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>

          <Tfoot>
            <Tr>
              <Th sx={thStyle}>Txn Hash</Th>
              <Th sx={thStyle}>From</Th>
              <Th sx={thStyle}>To</Th>
              <Th sx={thStyle}>Date</Th>
              <Th sx={thStyle} isNumeric>
                Amount
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Square>
  ) : (
    <Square minW={"100%"} minH={"100%"}>
      <Heading opacity={0.5}>No transactions found</Heading>
    </Square>
  );
}

export default React.memo(Transactions);
