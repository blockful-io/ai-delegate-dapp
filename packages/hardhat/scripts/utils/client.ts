import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

const account = privateKeyToAccount("0x2b8310b06671c90d890775fa9de0f3b11af26e0d1e7569bdbacfaffa1a81a95b");

export const client = createWalletClient({
  account,
  chain: sepolia,
  transport: http("https://eth-sepolia.g.alchemy.com/v2/bow93SW8hqPm2T1pRjzWcGdgueB-lvpb"),
}).extend(publicActions);
