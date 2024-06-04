import { useCallback } from "react";
import axios from "axios";
import { DAOWithProposals } from "./useDao";

enum Status {
  Pending = 0,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

export interface Proposal {
  proposalId: string;
  description: string;
  proposer: string;
  voteStart: string;
  voteEnd: string;
}

export interface Vote {
  id: string;
  address: string;
  votes: number;
}

const useProposal = () => {
  const SERVER_URL = process.env.NEXT_PUBLIC_AI_DELEGATE_ENDPOINT;

  if (!SERVER_URL) throw new Error("Missing NEXT_PUBLIC_AI_DELEGATE_ENDPOINT");

  const client = axios.create({
    baseURL: SERVER_URL,
  });

  const fetchProposals = useCallback(async (): Promise<Proposal[]> => {
    const { data: proposal } = await client.get<DAOWithProposals>(`/proposals`);
    return proposal.proposals.reverse();
  }, [client]);

  const fetchProposal = useCallback(
    async ({ proposalId }: Pick<Proposal, "proposalId">): Promise<Proposal> => {
      const { data: proposal } = await client.get<Proposal>(
        `/proposals/${proposalId}`
      );
      return proposal;
    },
    [client]
  );

  return { fetchProposals, fetchProposal };
};

export const dynamic = "force-dynamic";
export default useProposal;
