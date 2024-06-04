import Link from "next/link";

export interface Vote {
  proposalId: string;
  support: number;
  weight: string;
  voter: `0x${string}`;
  reason: string;
}

export const VoteCard = ({ vote, daoId }: { vote: Vote; daoId: string }) => {
  return (
    <Link
      href={`/dao/${daoId}/proposals/${vote.proposalId}`}
      key={vote.proposalId}
      className="hover:bg-[#141414] transition space-y-2 flex-col p-3 border border-gray-200 rounded-lg flex"
    >
      <div className="flex flex-col space-y-1">
        <p className="font-semibold">Proposal ID:</p>
        <p className="break-all line-clamp-1 ml-4">{vote.proposalId}</p>
      </div>
      <div className="flex flex-col space-y-1">
        <p className="font-semibold">Vote reason:</p>
        <p className="break-all ml-4">{vote.reason}</p>
      </div>
    </Link>
  );
};
