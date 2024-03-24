import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { auroraTestnet } from "viem/chains";

const account = privateKeyToAccount(
  "0x2b8310b06671c90d890775fa9de0f3b11af26e0d1e7569bdbacfaffa1a81a95b"
);

export const client = createWalletClient({
  account,
  chain: auroraTestnet,
  transport: http("https://testnet.aurora.dev"),
}).extend(publicActions);
