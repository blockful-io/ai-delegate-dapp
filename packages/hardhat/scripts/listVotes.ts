import { governorAbi } from "./abi";
import { client, governorAddress } from "./utils";

// Understand the past votes.
// To get a vote from a specific run a .filter on the returned array
async function main() {
  const events = await client.getContractEvents({
    abi: governorAbi,
    address: governorAddress,
    eventName: "VoteCast",
    fromBlock: 5546368n,
  });

  const votes = events.map(event => {
    const { proposalId, support, weight, voter } = (event as any).args;
    return { proposalId, support, weight, voter };
  });
  console.log(votes);

  return;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
