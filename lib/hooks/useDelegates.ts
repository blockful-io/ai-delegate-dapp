/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import axios from "axios";
import {
  BaseError,
  Hex,
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
import { getAIDelegateVotingPower } from "../blockchain";

export interface SummarizedAI {
  id: string;
  name: string;
  summary: string;
  address: string;
}

export enum DelegationStatus {
  UNDELEGATED,
  DELEGATING,
  DELEGATED,
}

export interface AI extends SummarizedAI {
  delegationStatus: DelegationStatus;
  votingPower: bigint;
}

const useDelegates = () => {
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
    chain: auroraTestnet,
    transport,
  }).extend(publicActions);
  const publicClient = createPublicClient({
    chain: auroraTestnet,
    transport: http(RPC_URL),
  });
  const contracts = deployedContracts[publicClient.chain.id];
  const client = axios.create({
    baseURL: SERVER_URL,
  });

  const fetchDelegates = useCallback(async () => {
    const { data: ais } = await client.get<SummarizedAI[]>("/delegates");
    const delegates = ais.reverse().slice(0, 5);

    return await Promise.all(
      delegates.map(async (delegate: SummarizedAI) => {
        const votingPower = await getAIDelegateVotingPower(
          delegate,
          publicClient,
          contracts.NDCGovernor
        );

        return {
          ...delegate,
          votingPower,
          delegationStatus: DelegationStatus.UNDELEGATED,
        };
      })
    );
  }, [
    contracts.NDCGovernor.abi,
    walletClient.account?.address,
    contracts.NDCGovernor.address,
  ]);

  const fetchDelegate = useCallback(
    async ({ id }: Pick<AI, "id">): Promise<AI> => {
      const { data: ai } = await client.get<SummarizedAI>(`/delegates/${id}`);

      return {
        ...ai,
        delegationStatus: DelegationStatus.UNDELEGATED,
        votingPower: 0n,
      };
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
    async ({
      voter,
    }: {
      voter: `0x${string}`;
    }): Promise<Record<string, any>[]> => {
      const { data: votes } = await client.get<Record<string, any>[]>(
        `/ai-delegate-vote/${voter}`
      );
      return votes;
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
    [walletClient, contracts, connectedAddress]
  );

  return {
    fetchDelegates,
    fetchDelegate,
    createDelegate,
    deleteAI,
    delegateVote,
    fetchAllDelegatesVotes,
    fetchDelegateVotes,
  };
};

export default useDelegates;
