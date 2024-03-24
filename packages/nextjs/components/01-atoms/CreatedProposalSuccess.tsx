54"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "./ProgressBar";

export const CardCreatedProposal = ({ proposalId }: { proposalId: string }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setSummary(window.localStorage.getItem(`summary`)!);
    setName(window.localStorage.getItem(`name`)!);
    setLoading(false);
  }, [proposalId]);

  if (loading || !summary) {
    return <span>Loading....</span>;
  }

  return (
    <div className="w-full flex flex-col md:justify-center md:items-center gap-4">
      <div className="border border-gray-300 p-4 text-white bg-[#F6F9F6] max-w-[382px] md:w-full min-h-[168px] rounded-xl overflow-auto">
        <div className="flex flex-col gap-3">
          <div className="text-[#17181C] font-medium text-[18px] flex">{name} </div>
          <div className="text-[#323439] font-normal text-[14px] flex">{summary}</div>
        </div>
      </div>
      <div className="border border-gray-300 p-4 text-white bg-[#F6F9F6] max-w-[382px] md:w-full min-h-[100px] rounded-xl ">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="text-[#17181C] text-[18px] font-medium ">Result</div>
            <button className="h-[28px] text-[#323439] bg-[#9192951F] py-2 px-3 flex items-center rounded-[100px]">
              See txn
            </button>
          </div>
          <div className="flex">
            <div className="flex bg-[#0BDC841F] w-full text-[12px] text-[#0BB76E] py-1 px-2 justify-center">
              APPROVED
            </div>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 p-4 text-white bg-[#F6F9F6] max-w-[382px] md:w-full min-h-[100px] rounded-xl ">
        <div className="flex flex-col gap-4">
          <p className="text-[#17181C] text-[18px] font-medium">Votes</p>
          <div className="flex justify-between">
            <div className="text-[#17181C] text-[18px] font-medium flex ">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="flex">{name.length < 10 ? name : name.slice(0, 10) + "..."}</div>
                  <div className="bg-[#0BDC841F] text-[#0BB76E] px-2 text-xs rounded-md ">YES</div>
                </div>
                <div className="text-[#595B5F] text-xs">3.738 votes - 17%</div>
              </div>
            </div>
            <button className="h-[38px] text-[#323439] bg-[#9192951F] py-2 px-3 flex items-center rounded-[100px]">
              See reason
            </button>
          </div>
          <ProgressBar currentStep={1} numberOfItems={10} />
        </div>
      </div>
      <button
        className="border bg-[#B1FF6F] rounded-[100px] border-gray-300 py-4 max-h-[54px] items-center flex justify-center"
        type="submit"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
};
