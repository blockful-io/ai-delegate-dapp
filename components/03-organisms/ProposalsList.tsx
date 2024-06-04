/* eslint-disable react-hooks/exhaustive-deps */
import { DefaultErrorMessage, ProposalCardSkeleton } from "../01-atoms";
import { ProposalCard } from "../02-molecules";
import { useEffect, useState } from "react";
import { Proposal } from "@/lib/hooks/useProposal";
import useDao, { DAOWithProposals } from "@/lib/hooks/useDao";

export const ProposalsList = ({ daoId }: { daoId: string }) => {
  const { fetchDaos } = useDao();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [daoWithProposals, setDaoWithProposals] =
    useState<DAOWithProposals | null>();

  useEffect(() => {
    if (!daoId) return;

    setError(null);

    fetchDaos()
      .then((res: DAOWithProposals[]) => {
        const dao = res.find((dao) => String(dao.id) === daoId);
        console.log(dao);
        if (dao) {
          setDaoWithProposals(dao);
        } else {
          setError(new Error("DAO not found"));
          setDaoWithProposals(null);
        }
      })
      .catch((e: unknown) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [daoId]);

  return (
    <div className="w-full h-full flex flex-grow mb-10 border border-gray-100 rounded-xl p-2">
      <div className="w-full h-full flex items-center flex-col flex-grow">
        <h1 className="space-grotesk text-2xl font-semibold my-6 text-[#F6F9F6] w-full flex justify-center">
          {daoWithProposals?.name || "____"} proposals
        </h1>
        <div className="h-max flex-grow w-full">
          {loading ? (
            <div className="w-full flex-col space-y-3">
              <ProposalCardSkeleton />
              <ProposalCardSkeleton />
              <ProposalCardSkeleton />
            </div>
          ) : error ? (
            <div
              className="flex-col space-y-3 p-4 rounded-xl"
              style={{
                border: "1px solid #B1FF6F",
                borderColor: error ? "#FF0000" : loading ? "#EEE" : "#B1FF6F",
              }}
            >
              <DefaultErrorMessage />
            </div>
          ) : (
            <div className="w-full gap-3 flex justify-center flex-wrap max-w-[335px]">
              {daoWithProposals?.proposals.map((proposal: Proposal) => (
                <ProposalCard
                  daoId={daoId}
                  key={proposal.proposalId}
                  proposal={proposal}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
