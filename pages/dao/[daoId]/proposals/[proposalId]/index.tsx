/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  DefaultErrorMessage,
  DelegateCardSkeleton,
  ProposalCardSkeleton,
} from "@/components/01-atoms";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import useProposal, { Proposal } from "@/lib/hooks/useProposal";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const { proposalId } = params || {};

  return {
    props: {
      proposalId,
    },
  };
};

export default function ProposalDetailsPage({
  proposalId,
}: {
  proposalId: string;
}) {
  const { fetchProposal } = useProposal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    if (!proposalId) return;

    setError(null);

    fetchProposal({ proposalId: proposalId })
      .then((proposal: Proposal) => {
        setProposal(proposal);
      })
      .catch((e: unknown) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [proposalId]);

  const PageContent = (children: JSX.Element) => {
    return (
      <div className="w-full -mt-10">
        <div className="w-full flex items-center flex-col">
          <div className="flex w-full items-center">
            <h1 className="pt-5 my-6 text-[#F6F9F6] w-full flex md:justify-center space-grotesk text-2xl">
              Proposal Details
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

  return PageContent(
    <>
      <div className="flex flex-col space-y-3 w-full mb-20">
        <h3 className="space-x-2 flex flex-wrap">
          <p className="underline underline-offset-1">ID____</p>
          <p className="break-all">{proposal?.proposalId}</p>
        </h3>
        <h1 className="space-x-2 flex flex-wrap">
          <p className="underline underline-offset-1">Description____</p>
          <p>{proposal?.description}</p>
        </h1>
      </div>
    </>
  );
}
