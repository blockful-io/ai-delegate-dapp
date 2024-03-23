import { governorAbi } from "./abi";
import { client, governorAddress } from "./utils";

async function castVote(proposalId: string, support: number, reason: string) {
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
