import { useAuthorizedAccess } from "@/lib/hooks/useAuthorizedAccess";
import type { NextPage } from "next";
import { TheHeader } from "@/components/02-molecules";
import { FormCreateProposal } from "@/components/01-atoms";

const CreateProposal: NextPage = () => {
  // useAuthorizedAccess();

  return (
    <div className="w-full">
      <TheHeader />
      <div className="w-full flex items-center flex-col">
        <FormCreateProposal />
      </div>
    </div>
  );
};

export default CreateProposal;
