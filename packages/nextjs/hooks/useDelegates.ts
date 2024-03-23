import { useCallback } from "react";
import axios from "axios";
import { createPublicClient, decodeFunctionResult, encodeFunctionData, http } from "viem";
import { localhost } from "viem/chains";
import deployedContracts from "~~/contracts/deployedContracts";

const SERVER_URL = "http://localhost:3000";

export interface AI {
  id: string;
  address: string;
  name: string;
  bias: string;
  votingPower: number;
  biasSummary: string;
  delegated: boolean;
  delegatedVotes: {
    delegate: string;
    votes: number;
  }[];
}

const useDelegates = () => {
  const publicClient = createPublicClient({
    chain: localhost,
    transport: http(),
  });
  const contract = deployedContracts[31337].YourContract;
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
    async ({ name, bias }: Pick<AI, "name" | "bias">): Promise<AI> => {
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
    async ({ id }: Pick<AI, "id">) => {
      const data = encodeFunctionData({
        abi: contract.abi,
        functionName: "greeting",
        // args: id,
      });
      const { data: response } = await publicClient.call({
        to: contract.address,
        data,
      });
      if (!response) {
        throw "unable to decode delegate response";
      }
      const output = decodeFunctionResult({
        abi: contract.abi,
        functionName: "greeting",
        data: response,
      });
      console.log({ output });
    },
    [contract, publicClient],
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
