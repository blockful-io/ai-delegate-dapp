/* eslint-disable react-hooks/exhaustive-deps */
import useDelegate, {
  DelegationStatus,
  SummarizedAI,
} from "@/lib/hooks/useDelegate";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  awaitBlockchainTxReceipt,
  triggerToastMessageOnBlockchainError,
} from "@/lib/blockchain";
import { BaseError } from "viem";
import { ArrowIcon, HandIcon, InfoIcon } from "../01-atoms";
import { toast } from "react-hot-toast";
import cc from "classcat";

export const AIDelegateCard = ({
  onDelegatedVotes,
  delegate,
  daoId,
}: {
  onDelegatedVotes: () => void;
  delegate: SummarizedAI;
  daoId: string;
}) => {
  const { delegateVote, userDelegatedVotesTo } = useDelegate();
  const [delegatedStatus, setDelegatedStatus] = useState(
    DelegationStatus.UNDELEGATED
  );

  useEffect(() => {
    userDelegatedVotesTo().then((delegatorAddr) => {
      if (delegatorAddr === delegate.address) {
        setDelegatedStatus(DelegationStatus.DELEGATED);
      }
    });
  }, []);

  return (
    <div
      className={cc([
        "flex flex-col border items-between h-full border-[#9192951f] text-white rounded-xl md:w-full",
        {
          "bg-[#B1FF6F]": delegatedStatus === DelegationStatus.DELEGATED,
          "bg-[#F6F9F6]": delegatedStatus !== DelegationStatus.DELEGATED,
        },
      ])}
    >
      <div className="flex gap-4 justify-between items-start flex-col p-4">
        <div className="flex justify-center items-start gap-2">
          <div className="min-w-9 w-9 h-9 border border-[#9192951f] rounded-[100px] flex justify-center items-center bg-[#9192951F]">
            <InfoIcon />
          </div>
          <div className="flex flex-col">
            <div className="text-[#323439] text-sm font-medium leading-[16.80px]">
              {delegate.name}
            </div>
            <div className="text-[#323439] text-sm line-clamp-4">
              {delegate.summary}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="w-9 h-9 border border-[#9192951f] rounded-[100px] flex justify-center items-center bg-[#9192951F]">
            <HandIcon />
          </div>

          <div className="flex flex-col">
            <div className="text-[#323439] text-sm font-medium leading-[16.80px]">
              Voting Power
            </div>
            <div className="text-[#323439] text-sm">{delegate.votingPower}</div>
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-[#9192951f] w-full"></div>
      <div className="p-4">
        <div className="text-black flex justify-between">
          <div className="gap-2 flex">
            <Link
              className="px-3 py-2 bg-[#9192951f] hover:bg-[#9192953f] transition text-sm rounded-[100px] cursor-pointer"
              href={`/dao/${daoId}/delegates/${delegate.id}`}
            >
              See details
            </Link>
          </div>
          <div>
            {delegatedStatus !== DelegationStatus.DELEGATED ? (
              <button
                disabled={delegatedStatus !== DelegationStatus.UNDELEGATED}
                className="flex items-center space-x-2 text-[#17181C] rounded-[100px] text-sm font-normal px-3 py-2 bg-[#B1FF6F] hover:bg-[#a4f065] transition"
                onClick={async () => {
                  let txHash: `0x${string}` | undefined = undefined;

                  setDelegatedStatus(DelegationStatus.DELEGATING);

                  try {
                    txHash = await delegateVote({
                      address: delegate.address as `0x${string}`,
                    });

                    const txReceipt = await awaitBlockchainTxReceipt(
                      txHash as `0x${string}`
                    );

                    if (txReceipt.status === "success") {
                      toast.success("Delegated votes successfully!");
                      setDelegatedStatus(DelegationStatus.DELEGATED);

                      onDelegatedVotes();
                    }
                  } catch (e) {
                    triggerToastMessageOnBlockchainError(e as BaseError);

                    setDelegatedStatus(DelegationStatus.UNDELEGATED);
                  }
                }}
              >
                {delegatedStatus === DelegationStatus.UNDELEGATED ? (
                  <ArrowIcon className="w-3" fill="black" />
                ) : delegatedStatus === DelegationStatus.DELEGATING ? (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                  </span>
                ) : null}
                <p>
                  {delegatedStatus === DelegationStatus.DELEGATING
                    ? "Delegating"
                    : delegatedStatus === DelegationStatus.UNDELEGATED
                    ? "Delegate"
                    : ""}
                </p>
              </button>
            ) : (
              <button className="pointer-events-none bg-gray-200 transition flex space-x-2 p-3 py-1 rounded-[100px] items-center h-full">
                <p className="text-sm">Delegated</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
