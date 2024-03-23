import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";
import { governorAbi } from "./abi";
import { governorAddress } from "./utils";

async function castVote(proposalId: string, support: number, reason: string) {
  const account = privateKeyToAccount("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");

  const client = createWalletClient({
    account,
    chain: hardhat,
    transport: http("http://127.0.0.1:8545/"),
  }).extend(publicActions);

  const { request } = await client.simulateContract({
    address: governorAddress,
    abi: governorAbi,
    functionName: "castVoteWithReason",
    args: [proposalId, support, reason],
  });

  await client.writeContract(request);
}

castVote("62091374486432352214980294707617451072370000933239216834345190676086689989000", 1, "gostuei").catch(error => {
  console.error(error);
  process.exitCode = 1;
});
