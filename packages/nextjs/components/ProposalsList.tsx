import { useEffect, useState } from "react";
import { Proposal, getProposals } from "~~/services/web3/getProposals";

const PROPOSALS_SKELETONS_NUMBER = 6;

export const ProposalsList = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    try {
      const proposals = getProposals();
      setProposals(proposals);
    } catch (error: unknown) {
      setError(String(error));
    }

    setLoading(false);
  }, []);

  return (
    <div className="w-full bg-[#F6F9F6]">
      {loading ? (
        <div className="flex flex-col gap-10">
          {Array.from({ length: PROPOSALS_SKELETONS_NUMBER }).map((_, index) => {
            return <div key={index} className="w-full bg-gray-200 animate-pulse h-10"></div>;
          })}
        </div>
      ) : error ? (
        <div>
          <h1>Error: {error}</h1>
        </div>
      ) : (
        <>
          {proposals.map(proposal => {
            return (
              <div key={proposal.id} className="border border-gray-300 p-4 my-4">
                <div className="flex justify-between">
                  <h1>{proposal.name}</h1>
                  <span>{proposal.status}</span>
                </div>
                <div>
                  <div className="flex space-x-4">
                    <p>Yes: {proposal.proVotes.length}</p>
                    <p>No: {proposal.conVotes.length}</p>
                  </div>
                </div>
                <a className="border text-black bg-gray-200 p-1" href={"/proposal/" + proposal.id}>
                  See details
                </a>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
