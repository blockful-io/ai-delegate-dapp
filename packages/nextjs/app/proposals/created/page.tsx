"use client";

import type { NextPage } from "next";
import { PageProps } from "~~/.next/types/app/page";
import { CardCreatedProposal } from "~~/components/01-atoms/CreatedProposalSuccess";
import { Header, HeaderVariant } from "~~/components/Header";

const CreatedProposal: NextPage = ({ searchParams }: PageProps) => {
  return (
    <div className="w-full">
      <Header variant={HeaderVariant.CREATED_PROPOSAL} />
      <div className="w-full flex items-center flex-col">
        <CardCreatedProposal proposalId={searchParams.id!} />
      </div>
    </div>
  );
};

export default CreatedProposal;
