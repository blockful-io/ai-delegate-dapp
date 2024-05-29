import { useAuthorizedAccess } from "@/lib/hooks/useAuthorizedAccess";
import { CardCreatedProposal, TheHeader } from "@/components/02-molecules";

const CreatedProposal = ({ id }: { id: string }) => {
  useAuthorizedAccess();
  return (
    <div className="w-full">
      <TheHeader />
      <div className="w-full flex items-center flex-col">
        <CardCreatedProposal proposalId={id} />
      </div>
    </div>
  );
};

export default CreatedProposal;
