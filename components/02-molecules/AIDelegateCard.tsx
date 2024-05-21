import useDelegates, {
  DelegationStatus,
  SummarizedAI,
} from "@/lib/hooks/useDelegates";
import { useState } from "react";
import Link from "next/link";
import {
  awaitBlockchainTxReceipt,
  triggerToastMessageOnBlockchainError,
} from "@/lib/blockchain";
import { BaseError } from "viem";

export const AIDelegateCard = ({ delegate }: { delegate: SummarizedAI }) => {
  const { delegateVote } = useDelegates();
  const [delegatedStatus, setDelegatedStatus] = useState(
    DelegationStatus.UNDELEGATED
  );

  return (
    <div
      key={delegate.id}
      className="border flex flex-col items-between h-full border-gray-300 p-4 text-white bg-[#F6F9F6] max-w-[382px] rounded-xl md:w-full"
    >
      <div className="flex flex-col gap-4 mb-2">
        <div className="text-black flex font-semibold">{delegate.name}</div>
      </div>
      <div className="flex justify-between gap-5">
        <div className="flex justify-center items-center gap-2">
          <p className="text-[#323439] text-sm font-medium leading-[16.80px]">
            Bias summary: {delegate.summary}
          </p>
        </div>
      </div>

      <div className="text-black flex pt-4 justify-between">
        <div className="gap-2 flex">
          <Link
            className="underline underline-offset-3 px-3 py-2 bg-gray-500 text-sm rounded-[100px] hover:bg-gray-400 transition cursor-pointer"
            href={`https://explorer.aurora.dev/address/${delegate.address}`}
          >
            See address
          </Link>
          <Link
            className="underline underline-offset-3 px-3 py-2 bg-gray-500 text-sm rounded-[100px] hover:bg-gray-400 transition cursor-pointer"
            href={`/delegates/${delegate.id}`}
          >
            See details
          </Link>
        </div>
        <div>
          <button
            disabled={delegatedStatus !== DelegationStatus.UNDELEGATED}
            className="bg-[#B1FF6F] text-[#17181C] rounded-[100px] text-sm font-normal px-3 py-2 "
            onClick={async () => {
              let txHash: `0x${string}` | undefined = undefined;

              setDelegatedStatus(DelegationStatus.DELEGATING);

              try {
                txHash = await delegateVote({
                  address: delegate.address as `0x${string}`,
                });
              } catch (e) {
                triggerToastMessageOnBlockchainError(e as BaseError);

                setDelegatedStatus(DelegationStatus.UNDELEGATED);
              }

              const txReceipt = await awaitBlockchainTxReceipt(
                txHash as `0x${string}`
              );

              if (txReceipt.status === "success") {
                setDelegatedStatus(DelegationStatus.DELEGATED);
              }
            }}
          >
            {delegatedStatus === DelegationStatus.DELEGATING
              ? "Delegating"
              : delegatedStatus === DelegationStatus.DELEGATED
              ? "Delegated"
              : "Delegate"}
          </button>
        </div>
      </div>
    </div>
  );
};
