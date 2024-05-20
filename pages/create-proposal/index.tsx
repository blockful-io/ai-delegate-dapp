import type { NextPage } from "next";
import { useAuthorizedAccess } from "@/lib/hooks/useAuthorizedAccess";
import { FormCreateProposal } from "@/components/01-atoms";

const CreateProposal: NextPage = () => {
  useAuthorizedAccess();

  return (
    <div className="w-full">
      <div className="w-full flex items-center flex-col">
        <FormCreateProposal />
      </div>
    </div>
  );
};

export default CreateProposal;
