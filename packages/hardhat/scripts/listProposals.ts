import { governorAbi } from "./abi";
import { client, governorAddress } from "./utils";

async function main() {
  const events = await client.getContractEvents({
    abi: governorAbi,
    address: governorAddress,
    eventName: "ProposalCreated",
    fromBlock: 5546368n,
  });

  const proposals = events.map(events => {
    const { proposalId, description } = (events as any).args;
    return { id: proposalId, description };
  });

  const governorContract = {
    address: governorAddress,
    abi: governorAbi,
  } as const;

  const statusCalldata = proposals.map(proposal => {
    return {
      ...governorContract,
      functionName: "state",
      args: [proposal.id],
    };
  });

  const status = await client.multicall({
    contracts: statusCalldata,
  });

  const proposalOverview = proposals.map((proposal, i) => {
    return {
      status: status[i].result,
      description: proposal.description,
      id: proposal.id,
    };
  });

  console.log(proposalOverview);
  return proposals;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
