import * as React from "react";
import { IExchange } from "../../../types/Types";

const EXCHANGE_DATA_URL =
  "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR";

export default async function getExchange(): Promise<IExchange> {
  return fetch(EXCHANGE_DATA_URL, { method: "GET" })
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      console.log(error);
    });
}
