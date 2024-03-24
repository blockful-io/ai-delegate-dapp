import { tokenAbi } from "./abi";
import { client, tokenAddress } from "./utils";

// Get the account that the user delegated to.
async function getVotingPower(delegates: string[]) {
  const tokenContract = {
    address: tokenAddress,
    abi: tokenAbi,
  } as const;

  const calldata = delegates.map(delegate => {
    return {
      ...tokenContract,
      functionName: "getVotes",
      args: [delegate],
    };
  });

  const result = await client.multicall({
    contracts: calldata,
  });

  const votingPowers = result.map(v => v.result);

  return votingPowers;
}

getVotingPower(["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
