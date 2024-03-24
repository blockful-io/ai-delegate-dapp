import { useCallback } from "react";
import axios from "axios";
import { createPublicClient, createWalletClient, custom, encodeFunctionData, http, publicActions } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";

const SERVER_URL = "http://localhost:9000";

export interface AI {
  id: string;
  address: string;
  name: string;
  summary: string;
  votingPower: number;
  biasSummary: string;
  delegated: boolean;
  delegatedVotes: {
    delegate: string;
    votes: number;
  }[];
}

const useDelegates = () => {
  const RPC = "https://eth-sepolia.g.alchemy.com/v2/bow93SW8hqPm2T1pRjzWcGdgueB-lvpb";
  const { address } = useAccount();
  const transport = typeof window !== "undefined" && window.ethereum ? custom(window.ethereum) : http(RPC);
  const walletClient = createWalletClient({
    account: address,
    chain: sepolia,
    transport,
  }).extend(publicActions);
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });
  const contracts = deployedContracts[publicClient.chain.id];
  const client = axios.create({
    baseURL: SERVER_URL,
  });

  const fetchDelegates = useCallback(async (): Promise<AI[]> => {
    const { data: ais } = await client.get<AI[]>("/delegates");
    return ais;
  }, [client]);

  const fetchDelegate = useCallback(
    async ({ id }: Pick<AI, "id">): Promise<AI> => {
      const { data: ai } = await client.get<AI>(`/delegates/${id}`);
      return ai;
    },
    [client],
  );

  const createDelegate = useCallback(
    async ({ name, summary: bias }: Pick<AI, "name" | "summary">): Promise<AI> => {
      const { data: ai } = await client.post("/delegates", {
        name,
        message: bias,
      });
      return ai;
    },
    [client],
  );

  const deleteAI = useCallback(
    async ({ id }: Pick<AI, "id">): Promise<void> => {
      await client.delete(`/delegates/${id}`);
    },
    [client],
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
        account: address,
      });
    },
    [walletClient, contracts],
  );

  return {
    fetchDelegates,
    fetchDelegate,
    createDelegate,
    deleteAI,
    delegateVote,
  };
};

export default useDelegates;
