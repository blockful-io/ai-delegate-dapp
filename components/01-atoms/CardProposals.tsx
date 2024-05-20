/* eslint-disable react-hooks/exhaustive-deps */
import cc from "classcat";
import { useEffect, useState } from "react";
import useProposals, { Proposal } from "../../lib/hooks/useProposal";

const PROPOSALS_SKELETONS_NUMBER = 6;

export const CardProposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const { getLastProposals } = useProposals();

  enum ProposalState {
    Pending = "Pending",
    Active = "Active",
    Defeated = "Defeated",
    Succeeded = "Succeeded",
    Queued = "Queued",
    Executed = "Executed",
  }

  useEffect(() => {
    setLoading(true);
    getLastProposals()
      .then(setProposals)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        {Array.from({ length: PROPOSALS_SKELETONS_NUMBER }).map((_, index) => {
          return (
            <div
              key={index}
              className="w-full bg-gray-200 animate-pulse h-10"
            ></div>
          );
        })}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error...</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col text-black md:justify-center md:items-center gap-3">
      <>
        {proposals.map((proposal) => {
          return (
            <div
              key={proposal.id}
              className="border border-gray-300 p-4 bg-[#F6F9F6] max-w-[382px] md:w-full rounded-xl text-black"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="flex gap-2 min-w-[150px]">
                    <div className="text-[#17181C] font-medium text-base flex">
                      {proposal.name.length > 10
                        ? proposal.name.slice(0, 20) + "..."
                        : proposal.name}
                    </div>
                  </div>
                  <div
                    className={cc([
                      "px-2 rounded-md flex",
                      proposal.status === ProposalState.Active &&
                        "bg-[#0BB76E26] ",
                      proposal.status === ProposalState.Queued &&
                        "bg-yellow-200",
                    ])}
                  >
                    {proposal.status}
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex">Yes {proposal.proVotes.length}</div>
                  <div className="flex">No {proposal.conVotes.length}</div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};
