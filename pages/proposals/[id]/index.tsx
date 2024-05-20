import { Proposal } from "@/lib/hooks/useProposal";

export default function ProposalPage({ proposal }: { proposal: Proposal }) {
  const PageContent = (children: JSX.Element) => {
    return (
      <div className="w-full">
        <div className="w-full flex items-center flex-col">
          <div className="flex w-full items-center">
            <h1 className="pt-5 my-6 text-[#F6F9F6] w-full flex md:justify-center space-grotesk text-2xl">
              Proposal details page
            </h1>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return PageContent(
    <div className="flex flex-col space-y-3">
      <h3>{proposal.id}</h3>
      <h4>{proposal.name}</h4>
      <p>{proposal.summary}</p>
      <span>status: {proposal.status}</span>
      <p>Con Votes: {proposal.conVotes.length}</p>
      <p>Pro Votes: {proposal.proVotes.length}</p>
      <a>{proposal.txHash}</a>
    </div>
  );
}
