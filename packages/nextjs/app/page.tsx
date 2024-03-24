"use client";

import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { CardProposals } from "~~/components/01-atoms/CardProposals";
import { ActiveTab, Footer } from "~~/components/Footer";
import { Header, HeaderVariant } from "~~/components/Header";

const Home: NextPage = () => {
  const router = useRouter();
  const { address: connectedAddress } = useAccount();

  return (
    <div className="w-full">
      <Header variant={HeaderVariant.DEFAULT} />
      <div className="w-full flex items-center flex-col ">
        <div className="flex justify-between w-full items-center">
          <h1 className="my-5 text-[#F6F9F6]">Previous Proposals</h1>
          {connectedAddress && (
            <button
              className="border text-black bg-[#B1FF6F] rounded-[100px] px-4 w-[95px] h-10"
              onClick={() => {
                router.push("/create-proposal");
              }}
            >
              + New
            </button>
          )}
        </div>
        <CardProposals />
        <Footer tab={ActiveTab.PROPOSAL} />
      </div>
    </div>
  );
};

export default Home;
