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
import deployedContracts from "~~/contracts/deployedContracts";

export interface AI {
  id: string;
  address: string;
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
  const RPC_URL = "https://testnet.aurora.dev";
  // const RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/bow93SW8hqPm2T1pRjzWcGdgueB-lvpb";
  const SERVER_URL = "https://server-production-b8e7.up.railway.app/";
  // const SERVER_URL = "http://localhost:9000";

  const { address: wAddress } = useAccount();
  const transport = typeof window !== "undefined" && window.ethereum ? custom(window.ethereum) : http(RPC_URL);
  const walletClient = createWalletClient({
    account: wAddress,
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
    const { data: ais } = await client.get<AI[]>("/delegates");
    const delegates = ais.reverse().slice(0, 5);

    return await Promise.all(
      delegates.map(async d => {
        const data = encodeFunctionData({
          abi: contracts.NDCGovernor.abi,
          functionName: "getVotes",
          args: [d.address, 0n],
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
        return { ...d, votingPower: votes };
      }),
    );
  }, [client, contracts.NDCGovernor.abi, contracts.NDCGovernor.address, walletClient]);

  const fetchDelegate = useCallback(
    async ({ id }: Pick<AI, "id">): Promise<AI> => {
      const { data: ai } = await client.get<AI>(`/delegates/${id}`);
      return ai;
    },
    [client],
  );

  const createDelegate = useCallback(
    async ({ name, summary: bias }: Pick<AI, "name" | "summary">): Promise<void> => {
      await client.post("/delegates", {
        name,
        message: bias,
      });
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
        account: wAddress!,
      });
    },
    [walletClient, contracts, wAddress],
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
