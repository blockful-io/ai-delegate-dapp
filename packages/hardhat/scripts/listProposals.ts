import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";
import { governorAbi } from "./abi";
import { governorAddress } from "./utils";

async function main() {
  const account = privateKeyToAccount("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
  const client = createWalletClient({
    account,
    chain: mainnet,
    transport: http("http://127.0.0.1:8545/"),
  }).extend(publicActions);

  const events = await client.getContractEvents({
    abi: governorAbi,
    address: governorAddress,
    eventName: "ProposalCreated",
    fromBlock: "earliest",
    toBlock: "latest",
  });

  const proposals = events.map(events => {
    const { proposalId, description } = (events as any).args;
    return { id: proposalId, description };
  });

  const state = await client.readContract({
    abi: governorAbi,
    address: governorAddress,
    functionName: "state",
    args: [proposals[0].id],
  });

  return proposals;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
