/* eslint-disable react-hooks/exhaustive-deps */
import { Proposal } from "./useProposal";
import { custom, http } from "viem";
import { useAccount } from "wagmi";
import axios from "axios";
import { useCallback } from "react";

export interface DAO {
  daoName: string;
  proposals: Proposal[];
}

const useDao = () => {
  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const SERVER_URL = process.env.NEXT_PUBLIC_AI_DELEGATE_ENDPOINT;

  if (!RPC_URL) throw new Error("Missing NEXT_PUBLIC_RPC_URL");
  if (!SERVER_URL) throw new Error("Missing NEXT_PUBLIC_AI_DELEGATE_ENDPOINT");

  const { address: connectedAddress } = useAccount();
  const transport =
    typeof window !== "undefined" && window.ethereum
      ? custom(window.ethereum)
      : http(RPC_URL);
  const client = axios.create({
    baseURL: SERVER_URL,
  });

  const fetchDaos = useCallback(async (): Promise<DAO> => {
    const { data: daos } = await client.get<DAO>("/proposals");

    return daos;
  }, []);

  return {
    fetchDaos,
  };
};

export const dynamic = "force-dynamic";
export default useDao;
