import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";
import { governorAbi } from "./abi/governor";
import { governorAddress } from "./utils/constants";

async function main() {
  const account = privateKeyToAccount("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
  const client = createWalletClient({
    account,
    chain: mainnet,
    transport: http("http://127.0.0.1:8545/"),
  }).extend(publicActions);

  const events = client.watchContractEvent({
    abi: governorAbi,
    address: governorAddress,
    eventName: "ProposalCreated",
    onLogs: logs => console.log(logs),
  });
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
