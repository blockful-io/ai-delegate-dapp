import { client, governorAddress, processProposal } from ".";
import { governorAbi } from "../abi";

export const watchForProposal = () => {
  client.watchContractEvent({
    abi: governorAbi,
    address: governorAddress,
    eventName: "ProposalCreated",
    onLogs: async (logs) => {
      const args = (logs[0] as any).args;
      const description = args.description as string;
      const proposalId = args.proposalId as bigint;
      // Each AI will see the proposal and call castVoteBySig

      console.log(`Received a proposal with ID: ${proposalId}`);
      await processProposal(description, proposalId);
    },
  });
};
