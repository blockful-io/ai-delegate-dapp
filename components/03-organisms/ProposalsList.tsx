/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { DefaultErrorMessage, ProposalCardSkeleton } from "../01-atoms";
import useProposals, { Proposal } from "@/lib/hooks/useProposal";
import { ProposalCard } from "../02-molecules";

export const ProposalsList = () => {
  const { getLastProposals } = useProposals();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [proposalsList, setProposalsList] = useState<Proposal[]>([]);

  useEffect(() => {
    setError(null);

    getLastProposals()
      .then((proposal: Proposal[]) => {
        console.log(proposal);
        setProposalsList(proposal);
      })
      .catch((e: unknown) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full h-full flex flex-grow">
      <div className="w-full h-full flex items-center flex-col flex-grow">
        <h1 className="my-6 text-[#F6F9F6] w-full flex text-2xl space-grotesk">
          Previous proposals
        </h1>
        <div className="h-max flex-grow w-full">
          {loading ? (
            <div className="w-full flex-col space-y-3">
              <ProposalCardSkeleton />
              <ProposalCardSkeleton />
              <ProposalCardSkeleton />
            </div>
          ) : error ? (
            <div className="flex-col space-y-3">
              <DefaultErrorMessage />
            </div>
          ) : (
            <div className="w-full gap-3 flex flex-col justify-center">
              {proposalsList.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
