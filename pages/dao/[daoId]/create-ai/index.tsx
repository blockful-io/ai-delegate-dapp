import type { NextPage } from "next";
import { FormCreateAI } from "@/components/01-atoms";
import { useAuthorizedAccess } from "@/lib/hooks/useAuthorizedAccess";

const CreateAI: NextPage = () => {
  useAuthorizedAccess();
  return (
    <div className="w-full">
      <div className="w-full flex items-center flex-col ">
        <h1 className="my-5 text-[#F6F9F6] w-full flex">New AI Delegate</h1>
        <FormCreateAI />
      </div>
    </div>
  );
};

export default CreateAI;
