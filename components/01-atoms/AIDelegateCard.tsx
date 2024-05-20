import useDelegates, { SummarizedAI } from "@/lib/hooks/useDelegates";
import { HandIcon } from "./icons/HandIcon";
import { useState } from "react";
import Link from "next/link";

export const AIDelegateCard = ({ delegate }: { delegate: SummarizedAI }) => {
  const { delegateVote } = useDelegates();
  const [delegated] = useState(false);

  return (
    <div
      key={delegate.id}
      className="border border-gray-300 p-4 text-white bg-[#F6F9F6] max-w-[382px] rounded-xl md:w-full"
    >
      <div className="flex flex-col gap-4 mb-2">
        <div className="text-black flex">{delegate.address.slice(0, 8)}</div>
      </div>
      <div className="flex justify-between gap-5">
        <div className="flex justify-center items-center gap-2">
          <p className="text-[#323439] text-sm font-medium leading-[16.80px]">
            Summary: {delegate.summary}
          </p>
        </div>
      </div>

      <div className="text-black flex pt-4 justify-between">
        <div className="gap-2 flex">
          <Link
            className="px-3 py-2 bg-gray-500 text-sm rounded-[100px] hover:bg-gray-300 transition cursor-pointer"
            href={`https://explorer.aurora.dev/address/${delegate.address}`}
          >
            See address
          </Link>
          <Link
            className="px-3 py-2 bg-gray-500 text-sm rounded-[100px] hover:bg-gray-300 transition cursor-pointer"
            href={`/delegates/${delegate.id}`}
          >
            See details
          </Link>
        </div>
        <div>
          {delegated ? (
            <button disabled>Delegated</button>
          ) : (
            <button
              className="bg-[#B1FF6F] text-[#17181C] rounded-[100px] text-sm font-normal px-3 py-2 "
              onClick={() => {
                delegateVote({ address: delegate.address as `0x${string}` });
              }}
            >
              Delegate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
