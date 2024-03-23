import { useCallback } from "react";
import { createPublicClient, encodeFunctionData, http } from "viem";
import { sepolia } from "viem/chains";
import deployedContracts from "~~/contracts/deployedContracts";

export interface Proposal {
  id: string;
  name: string;
  txHash?: string;
  summary: string;
  status: "Executed" | "Queued" | "Defeated" | "Succeeded";
  proVotes: Vote[];
  conVotes: Vote[];
}

export interface Vote {
  id: string;
  address: string;
  votes: number;
}

const useProposals = () => {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http("https://eth-sepolia.g.alchemy.com/v2/bow93SW8hqPm2T1pRjzWcGdgueB-lvpb"),
  });
  const contract = deployedContracts[publicClient.chain.id].NDCGovernor;

  const getLastProposals = useCallback(async (): Promise<Proposal[]> => {
    const events = await publicClient.getContractEvents({
      abi: contract.abi,
      address: contract.address,
      eventName: "ProposalCreated",
      fromBlock: 5546386n,
    });

    // proposalId?: bigint | undefined;
    // proposer?: string | undefined;
    // targets?: readonly string[] | undefined;
    // values?: readonly bigint[] | undefined;
    // signatures?: readonly string[] | undefined;
    // calldatas?: readonly `0x${string}`[] | undefined;
    // voteStart?: bigint | undefined;
    // voteEnd?: bigint | undefined;
    // description?: string | undefined;

    console.log({ events });
    return events.map(({ args }) => ({
      id: args.proposalId!.toString(),
      proVotes: [],
      conVotes: [],
      name: args.description!,
      summary: args.description!,
      status: "Defeated",
    }));
  }, [publicClient, contract]);

  const createProposal = useCallback(
    async ({ name }: Pick<Proposal, "name" | "summary">): Promise<void> => {
      const data = encodeFunctionData({
        abi: contract.abi,
        functionName: "setGreeting",
        args: [name],
      });

      const response = await publicClient.call({
        to: contract.address,
        data,
      });
      console.log({ response });
    },
    [publicClient, contract],
  );

  return { getLastProposals, createProposal };
};

export default useProposals;
