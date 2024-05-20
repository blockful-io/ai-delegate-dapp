import { HandIcon } from "../01-atoms";
import { Proposal } from "@/lib/hooks/useProposal";

interface ProposalsListProps {
  proposals: Proposal[];
}

export const ProposalsList = ({ proposals }: ProposalsListProps) => {
  return (
    <div className="w-full flex flex-col gap-3 md:justify-center md:items-center">
      <>
        {proposals.map((proposal) => {
          return (
            <div
              key={proposal.id}
              className="border border-gray-300 p-4 text-white bg-[#F6F9F6] max-w-[382px] rounded-xl md:w-full"
            >
              <div className="flex flex-col gap-4 mb-2">
                <div className="text-black flex">{proposal.name}</div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="flex justify-center items-center gap-2">
                  {/* <div className="w-9 h-9 border rounded-[100px] flex justify-center items-center bg-[#9192951F]">
                    <InfoIcon />
                  </div> */}
                  <div className="flex flex-col">
                    <div className="text-[#323439] text-sm font-medium leading-[16.80px]">
                      {proposal.id}
                    </div>
                    <div className="text-[#323439] text-sm">
                      {proposal.summary}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div className="w-9 h-9 border rounded-[100px] flex justify-center items-center bg-[#9192951F]">
                    <HandIcon />
                  </div>
                </div>
              </div>

              <div className="text-black flex pt-4 justify-end">
                {/* <div className="gap-2 flex ">
                  <button
                    className="px-3 py-2 bg-[#9192951F] text-sm rounded-[100px]"
                    onClick={() => router.push(`/delegates/${proposal.id}`)}
                  >
                    See details
                  </button>
                </div> */}
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};
