import { governorAbi } from "./abi";
import { client, governorAddress } from "./utils";

async function castVote(proposalId: bigint, support: number, reason: string) {
  const { request } = await client.simulateContract({
    address: governorAddress,
    abi: governorAbi,
    functionName: "castVoteWithReason",
    args: [proposalId, support, reason],
  });

  await client.writeContract(request);
}

castVote(1080772904160360484914352496509247323249943999575698388547042610825373697887n, 1, "gostuei").catch(error => {
  console.error(error);
  process.exitCode = 1;
});
