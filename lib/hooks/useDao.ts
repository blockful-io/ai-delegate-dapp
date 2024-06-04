/* eslint-disable react-hooks/exhaustive-deps */
import { Proposal } from "./useProposal";
import axios from "axios";
import { useCallback } from "react";

interface DAOWithProposalsAPI {
  daoName: string;
  proposals: Proposal[];
}

export interface DAOWithProposals extends DAO {
  proposals: Proposal[];
}

export interface DAO {
  constitution: string;
  name: string;
  id: number;
}

const useDao = () => {
  const SERVER_URL = process.env.NEXT_PUBLIC_AI_DELEGATE_ENDPOINT;

  if (!SERVER_URL) throw new Error("Missing NEXT_PUBLIC_AI_DELEGATE_ENDPOINT");

  const client = axios.create({
    baseURL: SERVER_URL,
  });

  const fetchDaos = useCallback(async (): Promise<DAOWithProposals[]> => {
    const { data: daos } = await client.get<DAO[]>("/daos");
    const { data: daosWithProposals } = await client.get<DAOWithProposalsAPI>(
      "/proposals"
    );

    return daos.map((dao: DAO) => {
      const daoProposals =
        daosWithProposals.daoName === dao.name
          ? daosWithProposals.proposals
          : [];

      return {
        ...dao,
        proposals: daoProposals.reverse(),
      };
    });
  }, []);

  const fetchDaoConstitution = useCallback(async ({ id }: Pick<DAO, "id">) => {
    const { data: dao } = await client.get<DAO>(`/dao-constitution/${id}`);
    const { data: daoProposals } = await client.get<Proposal[]>(
      `/dao-constitution/${id}`
    );

    return {
      ...dao,
      proposals: daoProposals,
    };
  }, []);

  return {
    fetchDaos,
    fetchDaoConstitution,
  };
};

export const dynamic = "force-dynamic";
export default useDao;
