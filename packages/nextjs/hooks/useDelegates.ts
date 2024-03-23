import { useCallback } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:3000";

export interface AI {
  id: string;
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
  const client = axios.create({
    baseURL: SERVER_URL,
  });

  const fetchDelegates = useCallback(async (): Promise<AI[]> => {
    const { data: ais } = await client.get("/delegates");
    return ais;
  }, [client]);

  const fetchDelegate = useCallback(
    async ({ id }: Pick<AI, "id">): Promise<AI> => {
      const { data: ai } = await client.get(`/delegates/${id}`);
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

  return {
    fetchDelegates,
    fetchDelegate,
    createDelegate,
    deleteAI,
  };
};

export default useDelegates;
