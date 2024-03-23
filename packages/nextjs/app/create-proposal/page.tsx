"use client";

import type { NextPage } from "next";
import { FormCreateProposal } from "~~/components/01-atoms/FormCreateProposal";
import { Header, HeaderVariant } from "~~/components/Header";

const CreateProposal: NextPage = () => {
  return (
    <div className="w-full">
      <Header variant={HeaderVariant.SECONDARY} />
      <div className="w-full flex items-center  flex-col">
        <FormCreateProposal />
      </div>
    </div>
  );
};

export default CreateProposal;
