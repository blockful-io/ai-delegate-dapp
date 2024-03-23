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

export const getAI = async (id: string): Promise<AI> => {
  const { data: ai } = await axios.get(`${SERVER_URL}/delegates/${id}`);
  return ai;
};

export const getAIs = async (): Promise<AI[]> => {
  const { data: ais } = await axios.get(`${SERVER_URL}/delegates`);
  return ais;
};
