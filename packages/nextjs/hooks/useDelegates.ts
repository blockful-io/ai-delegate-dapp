import { useCallback } from "react";
import axios from "axios";
import { createPublicClient, createWalletClient, custom, decodeFunctionResult, encodeFunctionData, http } from "viem";
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
  // const { address } = useAccount();
  // const walletClient = createWalletClient({
  //   account: address,
  //   chain: sepolia,
  //   transport: custom(window.ethereum!),
  // });
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
    console.log({ ais });
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
        bias,
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

  const delegate = useCallback(
    async ({ address }: Pick<AI, "address">) => {
      const data = encodeFunctionData({
        abi: contracts.NDCToken.abi,
        functionName: "numCheckpoints",
        args: [address],
      });
      const { data: response } = await publicClient.call({
        to: contracts.NDCToken.address,
        data,
      });
      const output = decodeFunctionResult({
        abi: contracts.NDCToken.abi,
        functionName: "numCheckpoints",
        data: response!,
      });
      console.log({ output });
    },
    [contracts, publicClient],
  );

  return {
    fetchDelegates,
    fetchDelegate,
    createDelegate,
    deleteAI,
    delegate,
  };
};

export default useDelegates;
