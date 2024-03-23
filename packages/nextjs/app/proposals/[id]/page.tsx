"use client";

import { useEffect, useState } from "react";
import useProposals, { Proposal } from "~~/hooks/useProposal";

const AI_SKELETONS_NUMBER = 1;

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  const [ai, setProposal] = useState<Proposal>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getProposal } = useProposals();

  useEffect(() => {
    setLoading(true);

    getProposal({ id: params.id })
      .then(setProposal)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [params.id]);

  // TODO: fetch information of wether the connectedAddress has delegated votes to some loaded AI or not
  const delegateVotes = (proposal: Proposal) => {
    // TODO: delegate votes to the selected AI
    alert(`Implement delegate votes to AI: ${proposal.name}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        {Array.from({ length: AI_SKELETONS_NUMBER }).map((_, index) => (
          <div key={index} className="w-full bg-gray-200 animate-pulse h-10"></div>
        ))}
      </div>
    );
  }

  if (error || !ai) {
    return (
      <div>
        <h1>Error...</h1>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[70%] lg:w-[50%] my-20">
      <div className="w-full border border-gray-300 p-4 my-4">
        <div className="flex justify-between">
          <h1>{ai.name}</h1>
        </div>
        <div>
          <div className="flex flex-col space-y-4">
            <p className="bg-white text-black p-4">{ai.summary}</p>
            <div className="bg-white text-black p-4">
              <h2>Votes</h2>
              <div>
                {ai.proVotes.map(yesVote => {
                  return (
                    <div key={yesVote.id} className="flex justify-between my-4">
                      <p>{yesVote.address}</p>
                      <span className="flex items-center px-4 bg-green-400">YES</span>
                      <p>{yesVote.votes}</p>
                    </div>
                  );
                })}

                {ai.conVotes.map(yesVote => {
                  return (
                    <div key={yesVote.id} className="flex justify-between">
                      <p>{yesVote.address}</p>
                      <span className="flex items-center px-4 bg-red-400">NO</span>
                      <p>{yesVote.votes}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full flex justify-between">
          <button onClick={() => delegateVotes(ai)} className="border bg-gray-200 text-black p-0.5 px-2">
            Delegate
          </button>
        </div>
      </div>
    </div>
  );
}
