import { castVoteBySig } from ".";
import { evaluateProposal, getAiList } from "../aiFunctions";

export const processProposal = async (
  description: string,
  proposalId: bigint
) => {
  for (const ai of await getAiList()) {
    const messages = ai.messages;

    console.log(`Consulting ai number: ${ai.id}`);
    const response = await evaluateProposal(description, messages);
    console.log(`ai delegate response: ${response}`);
    const [vote, reason] = response.split("\n\n");
    const encodedVote = vote.includes("YES") ? 1 : 0;
    console.log(`ai vote: ${encodedVote}`);

    if (reason) {
      console.log(`sending vote`);

      const tx = await castVoteBySig(proposalId, encodedVote, reason);
      console.log(`Vote tx: ${tx}`);
      console.log(`------------------------`);
    }
  }
};
