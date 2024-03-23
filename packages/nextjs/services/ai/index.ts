import axios from "axios";

const SERVER_URL = "http://localhost:3000";

export interface AI {
  id: string;
  name: string;
  bias: string;
  votingPower: number;
  biasSummary: string;
  delegatedVotes: {
    delegate: string;
    votes: number;
  }[];
}

export const getAI = async ({ id }: Pick<AI, "id">): Promise<AI> => {
  const { data: ai } = await axios.get(`${SERVER_URL}/delegates/${id}`);
  return ai;
};

export const getAIs = async (): Promise<AI[]> => {
  const { data: ais } = await axios.get(`${SERVER_URL}/delegates`);
  return ais;
};

export const createAI = async ({ name, bias }: Pick<AI, "name" | "bias">): Promise<AI> => {
  const { data: ai } = await axios.post(`${SERVER_URL}/delegates`, {
    name,
    bias,
  });
  return ai;
};

export const deleteAI = async ({ id }: Pick<AI, "id">): Promise<AI> => {
  const { data: ai } = await axios.delete(`${SERVER_URL}/delegates/${id}`);
  return ai;
};
