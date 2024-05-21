import { Proposal } from "@/lib/hooks/useProposal";

export const ProposalCard = ({ proposal }: { proposal: Proposal }) => {
  return (
    <div
      key={proposal.id}
      className="border flex flex-col items-between h-full border-gray-300 p-4 text-white bg-[#F6F9F6] max-w-[382px] rounded-xl md:w-full"
    >
      <div className="flex flex-col gap-4 mb-2">
        <div className="text-black flex font-semibold">{proposal.name}</div>
      </div>
      <div className="flex justify-between gap-5">
        <div className="flex justify-center items-center gap-2">
          <p className="text-[#323439] text-sm font-medium leading-[16.80px]">
            Summary: {proposal.summary}
          </p>
        </div>
      </div>

      <div className="text-black flex pt-4 justify-between"></div>
    </div>
  );
};
