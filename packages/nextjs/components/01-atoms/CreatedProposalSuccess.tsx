"use client";

import { useEffect, useState } from "react";

export const CardCreatedProposal = ({ proposalId }: { proposalId: string }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [name, setName] = useState("");

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
    <div className="w-full flex flex-col md:justify-center md:items-center">
      <div className=" border border-gray-300 p-4 text-white bg-[#F6F9F6] max-w-[382px] md:w-full min-h-[168px] rounded-xl">
        <div className="flex flex-col gap-3">
          <div className="text-[#17181C] font-medium text-[18px] flex">{name} </div>
          <div className="text-[#323439] font-normal text-[14px] flex">{summary}</div>
        </div>
      </div>
    </div>
  );
};
