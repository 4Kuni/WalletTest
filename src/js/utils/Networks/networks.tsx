import * as React from "react";
import {
  INetworksByChainId,
  INetworksByName,
  IRpcUrlsByNetwork,
} from "../../types/Types";

export const NETWORKS_BY_NAME: INetworksByName = {
  EthereumRopsten: 3,
  Celo: 42220,
  Polygon: 137,
  Optimism: 10,
  Arbitrum: 42161,
};

export const NETWORKS_BY_CHAIN_ID: INetworksByChainId = {
  3: "EthereumRopsten",
  42220: "Celo",
  137: "Polygon",
  10: "Optimism",
  42161: "Arbitrum",
};

export const RPC_URLS_BY_NETWORK: IRpcUrlsByNetwork = {
  EthereumRopsten: "https://ropsten.infura.io/v3/",
  Celo: "https://forno.celo.org",
  Polygon: "https://polygon-rpc.com/",
  Optimism: "https://mainnet.optimism.io",
  Arbitrum: "https://arb1.arbitrum.io/rpc",
};
