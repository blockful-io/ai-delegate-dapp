"use client";

import { useEffect, useState } from "react";
import { AddressWalletIcon } from "./AddressWalletIcon";
import { HandIcon } from "./HandIcon";
import { InfoIcon } from "./InfoIcon";
import { useAccount } from "wagmi";
import { AI, getAI } from "~~/services/ai";

type Props = {
  params: { id: string };
};

export const CardDelegate = ({ params }: Props) => {
  const [ai, setAI] = useState<AI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address: connectedAddress } = useAccount();
  const AI_SKELETONS_NUMBER = 1;

  useEffect(() => {
    async function asyncGetAi() {
      setLoading(true);
      setAI(await getAI({ id: params.id }));
    }

    asyncGetAi()
      .then(() => setLoading(false))
      .catch(e => setError(String(e)));
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        {Array.from({ length: AI_SKELETONS_NUMBER }).map((_, index) => {
          return <div key={index} className="w-full bg-gray-200 animate-pulse h-10"></div>;
        })}
      </div>
    );
  }

  if (error || !ai) {
    return (
      <div>
        <h1>Error: {error}</h1>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col">
      <div className=" border border-gray-300 p-4 text-white bg-[#F6F9F6] max-w-[382px] max-h-[168px] rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="text-black flex">
            <AddressWalletIcon address={connectedAddress} />
          </div>
          <div className="flex gap-5 justify-between">
            <div className="flex justify-center items-center gap-2">
              <div className="w-9 h-9 border rounded-[100px] flex justify-center items-center bg-[#9192951F]">
                <InfoIcon />
              </div>
              <div className="flex flex-col">
                <div className="text-[#323439] text-sm font-medium leading-[16.80px]">{ai.name}</div>
                <div className="text-[#323439] text-sm">{ai.biasSummary}</div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="w-9 h-9 border rounded-[100px] flex justify-center items-center bg-[#9192951F]">
                <HandIcon />
              </div>

              <div className="flex flex-col">
                <div className="text-[#323439] text-sm font-medium leading-[16.80px]">Voting Power</div>
                <div className="text-[#323439] text-sm">{ai.votingPower}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-black flex pt-4 justify-between">
          <div className="gap-2 flex ">
            <button className="px-3 py-2 bg-[#9192951F] text-sm rounded-[100px]">See details</button>
          </div>
          <div>
            <button className="bg-[#B1FF6F] text-[#17181C] rounded-[100px] text-sm font-normal px-3 py-2">
              Delegate
            </button>
          </div>
        </div>

        {/* <div className="flex justify-between">
        <h1>{ai.name}</h1>
      </div>
      <div>
        <div className="flex space-x-4">
          <p>Bias: {ai.biasSummary}</p>
          <p>Voting Power: {ai.votingPower}</p>
        </div>
      </div>
      <div className="w-full flex justify-between">
        {ai && true && <RevokeButton id={ai.id} />}
        {ai && <DelegateButton id={ai.id} />}
      </div> */}
      </div>
    </div>
  );
};
