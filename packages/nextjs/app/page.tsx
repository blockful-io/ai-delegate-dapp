"use client";

import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { ProposalsList } from "~~/components/ProposalsList";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className="w-full px-6">
      <div className="w-full flex items-center justify-between ">
        <h1 className="my-5 text-[#F6F9F6]">Previous Proposals</h1>
        <button
          className="border text-black bg-[#B1FF6F] rounded-[100px] px-4 w-[95px] h-10"
          onClick={() => {
            router.push("/create-proposal");
          }}
        >
          + New
        </button>
      </div>
      <ProposalsList />
    </div>
  );
};

export default Home;
