import { useState } from "react";
import { HandIcon } from "./01-atoms/HandIcon";
import useDelegate from "~~/hooks/useDelegates";
import { AI } from "~~/hooks/useDelegates";

interface AIListProps {
  delegates: AI[];
}

export const AIsList = ({ delegates }: AIListProps) => {
  const { delegateVote } = useDelegate();
  const [delegated] = useState(false);

  return (
    <div className="w-full flex flex-col gap-3 md:justify-center md:items-center">
      <>
        {delegates.map(d => {
          return (
            <div
              key={d.id}
              className="border border-gray-300 p-4 text-white bg-[#F6F9F6] max-w-[382px] rounded-xl md:w-full"
            >
              <div className="flex flex-col gap-4 mb-2">
                <div className="text-black flex">{d.address.slice(0, 8)}</div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="flex justify-center items-center gap-2">
                  {/* <div className="w-9 h-9 border rounded-[100px] flex justify-center items-center bg-[#9192951F]">
                    <InfoIcon />
                  </div> */}
                  <div className="flex flex-col">
                    <div className="text-[#323439] text-sm font-medium leading-[16.80px]">{d.name}</div>
                    <div className="text-[#323439] text-sm">{d.summary}</div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div className="w-9 h-9 border rounded-[100px] flex justify-center items-center bg-[#9192951F]">
                    <HandIcon />
                  </div>

                  <div className="flex flex-col">
                    <div className="text-[#323439] text-sm font-medium leading-[16.80px]">Voting Power</div>
                    <div className="text-[#323439] text-sm">{d.votingPower.toString()}</div>
                  </div>
                </div>
              </div>

              <div className="text-black flex pt-4 justify-end">
                {/* <div className="gap-2 flex ">
                  <button
                    className="px-3 py-2 bg-[#9192951F] text-sm rounded-[100px]"
                    onClick={() => router.push(`/delegates/${d.id}`)}
                  >
                    See details
                  </button>
                </div> */}
                <div>
                  {delegated ? (
                    <button disabled>Delegated</button>
                  ) : (
                    <button
                      className="bg-[#B1FF6F] text-[#17181C] rounded-[100px] text-sm font-normal px-3 py-2 "
                      onClick={() => {
                        delegateVote({ address: d.address });
                      }}
                    >
                      Delegate
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};
