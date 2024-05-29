/* eslint-disable react-hooks/exhaustive-deps */
import useProposal, { Proposal } from "@/lib/hooks/useProposal";
import { DefaultErrorMessage, ProposalCardSkeleton } from "../01-atoms";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProposalCard = ({
  proposal,
  daoId,
}: {
  proposal: Proposal;
  daoId: string;
}) => {
  const { fetchProposal } = useProposal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [completeProposal, setCompleteProposal] = useState<Proposal | null>(
    null
  );

  useEffect(() => {
    if (!proposal) return;

    fetchProposal({ proposalId: proposal.proposalId })
      .then((proposal: Proposal) => {
        setCompleteProposal(proposal);
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
          <div className="flex w-full items-center"></div>
          {children}
        </div>
      </div>
    );
  };

  if (loading) {
    return PageContent(
      <div className="flex flex-col gap-10">
        <ProposalCardSkeleton />
      </div>
    );
  }

  if (error) {
    return PageContent(
      <div className="flex flex-col gap-10">
        <DefaultErrorMessage />
      </div>
    );
  }

  if (!completeProposal) return null;

  return (
    <div className="flex flex-col bg-[#F6F9F6] border items-between h-full border-gray-300 text-white rounded-xl md:w-full">
      <div className="flex gap-4 justify-between items-start flex-col p-4">
        <div className="flex justify-center items-start gap-2">
          <div className="flex flex-col">
            <div className="text-[#323439] text-sm font-medium leading-[16.80px] flex flex-wrap space-x-2">
              <p className="font-semibold">Proposed by____</p>
              <p className="break-all">{completeProposal.proposer}</p>
            </div>
            <div className="text-[#323439] mt-4 text-sm font-medium leading-[16.80px] flex flex-wrap space-x-2">
              <p className="font-semibold">Description____</p>
              <p className="break-all line-clamp-6">
                {completeProposal.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-gray-200 w-full"></div>
      <div className="p-4">
        <div className="text-black flex justify-between">
          <div className="gap-2 flex">
            <Link
              className="px-3 py-2 bg-gray-200 text-sm rounded-[100px] hover:bg-gray-300 transition cursor-pointer"
              href={`/dao/${daoId}/proposals/${completeProposal.proposalId}`}
            >
              See details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
