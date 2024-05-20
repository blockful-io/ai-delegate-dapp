import { useCallback } from "react";
import axios from "axios";
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
import { AIDelegates } from "../mocks";

// For mockup only
export interface SummarizedAI {
  id: string;
  summary: string;
  address: string;
}

export interface AI {
  id: string;
  address: `0x${string}`;
  name: string;
  summary: string;
  votingPower: bigint;
  biasSummary: string;
  delegated: boolean;
  delegatedVotes: {
    delegate: string;
    votes: number;
  }[];
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
        const data = encodeFunctionData({
          abi: contracts.NDCGovernor.abi,
          functionName: "getVotes",
          args: [delegate.address as `0x${string}`, 0n],
        });
        const r = await walletClient.call({
          data,
          to: contracts.NDCGovernor.address,
        });

        const votes = decodeFunctionResult({
          abi: contracts.NDCGovernor.abi,
          data: r.data!,
          functionName: "getVotes",
        });
        return { ...delegate, votingPower: votes };
      })
    );
  }, [
    client,
    contracts.NDCGovernor.abi,
    contracts.NDCGovernor.address,
    walletClient,
  ]);

  const fetchDelegate = useCallback(
    async ({ id }: Pick<SummarizedAI, "id">): Promise<SummarizedAI> => {
      const { data: ai } = await client.get<AI>(`/delegates/${id}`);
      return ai;
    },
    [client]
  );

  const fetchAllDelegatesVotes = useCallback(async (): Promise<AI> => {
    const { data: votes } = await client.get<AI>(`/ai-delegate-votes`);
    return votes;
  }, [client]);

  const fetchDelegateVotes = useCallback(
    async ({ voter }: { voter: `0x${string}` }): Promise<AI> => {
      const { data: votes } = await client.get<AI>(
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
    }: Pick<AI, "name" | "summary">): Promise<void> => {
      await client.post("/delegates", {
        name,
        message: bias,
      });
    },
    [client]
  );

  const deleteAI = useCallback(
    async ({ id }: Pick<AI, "id">): Promise<void> => {
      await client.delete(`/delegates/${id}`);
    },
    [client]
  );

  const delegateVote = useCallback(
    async ({ address }: Pick<AI, "address">) => {
      const data = encodeFunctionData({
        abi: contracts.NDCToken.abi,
        functionName: "delegate",
        args: [address],
      });

      await walletClient.sendTransaction({
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
