"use client";

import type { NextPage } from "next";
import { ProposalsList } from "~~/components/ProposalsList";

const Home: NextPage = () => {
  return (
    <div className="w-full md:w-[70%] lg:w-[50%] mx-auto my-20">
      <div className="w-full flex items-center justify-between">
        <h1 className="my-5">Previous Proposals</h1>
        <a className="border text-black bg-gray-200 px-2 py-0.5" href="/create-proposal">
          + New
        </a>
      </div>
      <ProposalsList />
    </div>
  );
};

export default Home;
