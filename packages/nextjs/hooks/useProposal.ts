"use client";

import { useCallback } from "react";
import { createPublicClient, createWalletClient, custom, encodeFunctionData, http } from "viem";
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
  const walletClient = createWalletClient({
    account: address,
    chain: sepolia,
    transport: custom(window.ethereum!),
  });
  const publicClient = createPublicClient({
    chain: sepolia,
    // transport: http(),
    transport: http("https://eth-sepolia.g.alchemy.com/v2/bow93SW8hqPm2T1pRjzWcGdgueB-lvpb"),
  });
  const contract = deployedContracts[publicClient.chain.id].NDCGovernor;

  const getLastProposals = useCallback(
    async ({ limit = 4 }: { limit?: number } = {}): Promise<Proposal[]> => {
      const events = await publicClient.getContractEvents({
        abi: contract.abi,
        address: contract.address,
        eventName: "ProposalCreated",
        fromBlock: 0n,
      });

      console.log({ events });
      return events
        .reverse()
        .slice(0, limit)
        .map(({ args }) => ({
          id: args.proposalId!.toString(),
          proVotes: [],
          conVotes: [],
          name: args.description!,
          summary: args.description!,
          status: "Defeated",
        }));
    },
    [publicClient, contract],
  );

  const createProposal = useCallback(
    async ({ name }: Pick<Proposal, "name">): Promise<void> => {
      const data = encodeFunctionData({
        abi: contract.abi,
        functionName: "propose",
        args: [[contract.address], [0n], ["0x"], name],
      });

      if (!address) {
        return;
      }

      await walletClient.sendTransaction({
        to: contract.address,
        data,
        account: address,
      });
    },
    [walletClient, contract, address],
  );

  return { getLastProposals, createProposal };
};

export default useProposals;
