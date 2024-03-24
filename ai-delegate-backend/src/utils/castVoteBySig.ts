import { client, governorAddress } from ".";
import { governorAbi } from "../abi";

export const castVoteBySig = async (
  proposalId: bigint,
  support: number,
  reason: string
) => {
  console.log({ proposalId, support, reason });

  let response: number = 0;

  let i = 0;
  while (response != 1) {
    console.log(++i);
    response = (await client.readContract({
      address: governorAddress,
      abi: governorAbi,
      functionName: "state",
      args: [proposalId],
    })) as number;
    await setTimeout(() => {}, 1000);
  }

  console.log({ response });

  const tx = await client.writeContract({
    address: governorAddress,
    abi: governorAbi,
    functionName: "castVoteWithReason", //castVoteWithReasonAndParamsBySig
    args: [proposalId, support, reason],
  });

  return tx;
};
