/* eslint-disable react-hooks/exhaustive-deps */
import {
  DefaultErrorMessage,
  DelegateCardSkeleton,
} from "@/components/01-atoms";
import useProposals, { Proposal } from "@/lib/hooks/useProposal";
import { useEffect, useState } from "react";

export default function ProposalPage({ id }: { id: string }) {
  const { fetchProposal } = useProposals();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    setError(null);

    fetchProposal({ id })
      .then((proposal: Proposal) => {
        setProposal(proposal);
      })
      .catch((e: unknown) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const PageContent = (children: JSX.Element) => {
    return (
      <div className="w-full">
        <div className="w-full flex items-center flex-col">
          <div className="flex w-full items-center">
            <h1 className="pt-5 my-6 text-[#F6F9F6] w-full flex md:justify-center space-grotesk text-2xl">
              Proposal details page
            </h1>
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (loading) {
    return PageContent(
      <div className="flex flex-col gap-10">
        <DelegateCardSkeleton />
      </div>
    );
  }

  if (error || !proposal) {
    return PageContent(
      <div className="flex flex-col gap-10">
        <DefaultErrorMessage />
      </div>
    );
  }

  return PageContent(
    <div className="flex flex-col space-y-3">
      <h3>{proposal.id}</h3>
      <h4>{proposal.name}</h4>
      <p>{proposal.summary}</p>
      <span>status: {proposal.status}</span>
      <p>Con Votes: {proposal.conVotes.length}</p>
      <p>Pro Votes: {proposal.proVotes.length}</p>
      <a>{proposal.txHash}</a>
    </div>
  );
}
