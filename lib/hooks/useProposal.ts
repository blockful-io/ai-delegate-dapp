import { useCallback } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  decodeFunctionResult,
  encodeFunctionData,
  http,
  publicActions,
} from "viem";
import { auroraTestnet } from "viem/chains";
import { useAccount } from "wagmi";
import deployedContracts from "../../contracts/deployedContracts";

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
  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  if (!RPC_URL) {
    throw new Error("RPC_URL is not defined");
  }

  const { address } = useAccount();
  const transport =
    typeof window !== "undefined" && window.ethereum
      ? custom(window.ethereum)
      : http(RPC_URL);
  const walletClient = createWalletClient({
    account: address,
    chain: auroraTestnet,
    transport,
  }).extend(publicActions);
  const publicClient = createPublicClient({
    chain: auroraTestnet,
    transport: http(RPC_URL),
  });
  const contract = deployedContracts[publicClient.chain.id].NDCGovernor;

  const getLastProposals = useCallback(
    async ({ limit = 4 }: { limit?: number } = {}) => {
      const events = await publicClient.getContractEvents({
        abi: contract.abi,
        address: contract.address,
        eventName: "ProposalCreated",
        fromBlock: 0n,
      });

      const proposals = events
        .reverse()
        .slice(0, limit)
        .map((events) => {
          const { proposalId, description } = (events as any).args;
          return { id: proposalId, description };
        });

      const statusCalldatas = proposals.map((proposal) =>
        encodeFunctionData({
          abi: contract.abi,
          functionName: "state",
          args: [proposal.id],
        })
      );

      const status = await Promise.all(
        statusCalldatas.map(async (data) => {
          const r = await walletClient.call({
            to: contract.address,
            data,
          });
          return decodeFunctionResult({
            abi: contract.abi,
            functionName: "state",
            data: r.data!,
          });
        })
      );

      return proposals.map((proposal, i): Proposal => {
        const [name, summary] = proposal.description.split("\n");
        return {
          id: proposal.id.toString(),
          status: Status[status[i] as number],
          name,
          summary,
          proVotes: [],
          conVotes: [],
        };
      });
    },
    [publicClient, contract, walletClient]
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
    [walletClient, contract, address]
  );

  return { getLastProposals, createProposal };
};

export const dynamic = "force-dynamic";
export default useProposals;
