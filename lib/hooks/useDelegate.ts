/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import axios from "axios";
import {
  Hex,
  createPublicClient,
  createWalletClient,
  custom,
  decodeFunctionResult,
  encodeFunctionData,
  http,
  publicActions,
} from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import deployedContracts from "@/contracts/deployedContracts";

export interface SummarizedAI {
  id: string;
  name: string;
  summary: string;
  address: string;
  votingPower: number;
}

export enum DelegationStatus {
  UNDELEGATED,
  DELEGATING,
  DELEGATED,
}

export interface Vote {
  proposalId: string;
  support: number;
  weight: string;
  voter: `0x${string}`;
  reason: string;
}

export interface DelegatedVotes {
  delegatorAddr: `0x${string}`;
  numberOfVotes: string;
}

const useDelegate = () => {
  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const SERVER_URL = process.env.NEXT_PUBLIC_AI_DELEGATE_ENDPOINT;

  if (!RPC_URL) throw new Error("Missing NEXT_PUBLIC_RPC_URL");
  if (!SERVER_URL) throw new Error("Missing NEXT_PUBLIC_AI_DELEGATE_ENDPOINT");

  const { address: connectedAddress } = useAccount();
  const transport =
    typeof window !== "undefined" && window.ethereum
      ? custom(window.ethereum)
      : http(RPC_URL);
  const walletClient = createWalletClient({
    account: connectedAddress,
    chain: sepolia,
    transport,
  }).extend(publicActions);
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(RPC_URL),
  });
  const contracts = deployedContracts[publicClient.chain.id];
  const client = axios.create({
    baseURL: SERVER_URL,
  });

  const fetchDelegates = useCallback(async (): Promise<SummarizedAI[]> => {
    const { data: ais } = await client.get<SummarizedAI[]>("/delegates");
    const delegates = ais.reverse().slice(0, 5);

    return await Promise.all(
      delegates.map(async (delegate: SummarizedAI) => {
        const votingPower = await fetchVotingPower({
          delegate: delegate.address as `0x${string}`,
        });
        return { ...delegate, votingPower };
      })
    );
  }, [client, contracts.NDCGovernor.abi, contracts.NDCGovernor.address]);

  const fetchDelegate = useCallback(
    async ({ id }: Pick<SummarizedAI, "id">): Promise<SummarizedAI> => {
      const { data: ai } = await client.get<SummarizedAI>(`/delegates/${id}`);
      return ai;
    },
    [client]
  );

  const fetchAllDelegatesVotes =
    useCallback(async (): Promise<SummarizedAI> => {
      const { data: votes } = await client.get<SummarizedAI>(
        `/ai-delegate-votes`
      );
      return votes;
    }, [client]);

  const fetchDelegateVotes = useCallback(
    async ({ voter }: { voter: `0x${string}` }): Promise<Vote[]> => {
      const { data: votes } = await client.get<Vote[]>(
        `/ai-delegate-vote/${voter}`
      );
      return votes;
    },
    [client]
  );

  const fetchVotingPower = useCallback(
    async ({ delegate }: { delegate: `0x${string}` }): Promise<number> => {
      const { data: votingPower } = await client.get<number>(
        `/voting-power/${delegate}`
      );
      return votingPower;
    },
    [client]
  );

  const createDelegate = useCallback(
    async ({
      name,
      summary: bias,
    }: Pick<SummarizedAI, "name" | "summary">): Promise<void> => {
      await client.post("/delegates", {
        name,
        message: bias,
      });
    },
    [client]
  );

  const deleteAI = useCallback(
    async ({ id }: Pick<SummarizedAI, "id">): Promise<void> => {
      await client.delete(`/delegates/${id}`);
    },
    [client]
  );

  const delegateVote = useCallback(
    async ({ address }: Pick<SummarizedAI, "address">) => {
      const data: Hex = encodeFunctionData({
        abi: contracts.NDCToken.abi,
        functionName: "delegate",
        args: [address as `0x${string}`],
      });

      return await walletClient.sendTransaction({
        to: contracts.NDCToken.address,
        data,
        account: connectedAddress!,
      });
    },
    [connectedAddress]
  );

  const userDelegatedVotesTo = useCallback(async (): Promise<
    `0x${string}` | null
  > => {
    if (!connectedAddress && !client) return null;

    const delegatedVotes: DelegatedVotes = await client.get(
      `/has-delegated-votes/${connectedAddress}`
    );

    return delegatedVotes.delegatorAddr;
  }, [connectedAddress]);

  return {
    deleteAI,
    delegateVote,
    fetchDelegate,
    fetchDelegates,
    createDelegate,
    fetchAllDelegatesVotes,
    userDelegatedVotesTo,
    fetchDelegateVotes,
  };
};

export default useDelegate;
