/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import {
  InfoIcon,
  HandIcon,
  DelegateCardSkeleton,
  DefaultErrorMessage,
} from "../01-atoms";
import Link from "next/link";
import useDelegates, { SummarizedAI } from "../../lib/hooks/useDelegates";

type AIDelegateCardProps = { id: string };

export const AIDelegateCard = ({ id }: AIDelegateCardProps) => {
  const [ai, setAI] = useState<SummarizedAI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { fetchDelegate, delegateVote } = useDelegates();

  useEffect(() => {
    setLoading(true);

    fetchDelegate({ id })
      .then((ai) => setAI(ai))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        <DelegateCardSkeleton />
      </div>
    );
  }

  if (error || !ai) {
    return <DefaultErrorMessage />;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center max-w-[400px]">
      <div className="border border-gray-300 p-4 text-white bg-[#F6F9F6] w-full max-h-[168px] rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="flex gap-5 justify-between">
            <div className="flex justify-center items-center gap-2">
              <div className="w-9 h-9 border rounded-[100px] flex justify-center items-center bg-[#9192951F]">
                <InfoIcon />
              </div>
              <div className="flex flex-col">
                <div className="text-[#323439] text-sm font-medium leading-[16.80px]">
                  {ai.id}
                </div>
                <div className="text-[#323439] text-sm">{ai.summary}</div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="w-9 h-9 border rounded-[100px] flex justify-center items-center bg-[#9192951F]">
                <HandIcon />
              </div>

              <div className="flex flex-col">
                <div className="text-[#323439] text-sm font-medium leading-[16.80px]">
                  Voting Power
                </div>
                <div className="text-[#323439] text-sm">
                  1.000.000
                  {/* For mockup only */}
                  {/* {ai.votingPower.toString()} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-black flex pt-4 justify-between">
          <div className="gap-2 flex ">
            <Link
              href={`/delegates/${id}`}
              className="px-3 py-2 bg-[#9192951F] text-sm rounded-[100px]"
            >
              See details
            </Link>
          </div>
          <div>
            <button
              onClick={() =>
                delegateVote({ address: ai.address as `0x${string}` })
              }
              className="bg-[#B1FF6F] text-[#17181C] rounded-[100px] text-sm font-normal px-3 py-2"
            >
              Delegate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
