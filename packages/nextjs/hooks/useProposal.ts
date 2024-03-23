import { useCallback } from "react";
import { createPublicClient, decodeFunctionResult, encodeFunctionData, http, parseEther } from "viem";
import { hardhat, sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";

export interface Proposal {
  id: string;
  name: string;
  txHash?: string;
  summary: string;
  status: "Executed" | "Queued" | "Defeated" | "Succeeded" | "Active";
  proVotes: Vote[];
  conVotes: Vote[];
}

export interface Vote {
  id: string;
  address: string;
  votes: number;
}

const useProposals = () => {
  const { address } = useAccount();
  const publicClient = createPublicClient({
    chain: sepolia,
    // transport: http(),
    transport: http("https://eth-sepolia.g.alchemy.com/v2/bow93SW8hqPm2T1pRjzWcGdgueB-lvpb"),
  });
  const contract = deployedContracts[publicClient.chain.id].NDCGovernor;

  const getLastProposals = useCallback(async (): Promise<Proposal[]> => {
    const events = await publicClient.getContractEvents({
      abi: contract.abi,
      address: contract.address,
      eventName: "ProposalCreated",
      fromBlock: 0n,
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
    async ({ name }: Pick<Proposal, "name">): Promise<void> => {
      const data = encodeFunctionData({
        abi: contract.abi,
        functionName: "propose",
        args: [[contract.address], [0n], ["0x"], name],
      });

      const response = await publicClient.call({
        to: contract.address,
        data,
        account: address,
      });

      if (!response.data) {
        throw "unable to create";
      }

      const output = decodeFunctionResult({
        functionName: "propose",
        abi: contract.abi,
        data: response.data,
      });

      console.log({ output });
    },
    [publicClient, contract, address],
  );

  return { getLastProposals, createProposal };
};

export default useProposals;
