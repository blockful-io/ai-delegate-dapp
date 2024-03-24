"use client";

import { useCallback } from "react";
import { createPublicClient, createWalletClient, custom, encodeFunctionData, http, publicActions } from "viem";
import { hardhat, sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";

enum Status {
  Pending = 0,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

export interface Proposal {
  id: string;
  name: string;
  txHash?: string;
  summary: string;
  status: string;
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
  }).extend(publicActions);
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
      const proposals = events
        .reverse()
        .slice(0, limit)
        .map(events => {
          const { proposalId, description } = (events as any).args;
          return { id: proposalId, description };
        });

      const statusCalldatas = proposals.map(proposal => ({
        abi: contract.abi,
        functionName: "state",
        args: [proposal.id],
        address: contract.address,
      }));

      const status = await walletClient.multicall({
        contracts: statusCalldatas,
      });

      return proposals.map((proposal, i): Proposal => {
        const [name, summary] = proposal.description.split("\n");
        return {
          id: proposal.id.toString(),
          status: Status[status[i].result as number],
          name,
          summary,
          proVotes: [],
          conVotes: [],
        };
      });
    },
    [publicClient, contract, walletClient],
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
