import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PageTab, PageTabs } from "@/components/02-molecules";
import { ProposalsList } from "@/components/03-organisms";
import { useAuthorizedAccess } from "@/lib/hooks/useAuthorizedAccess";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const { daoId } = params || {};

  return {
    props: {
      daoId,
    },
  };
};

export default function ProposalsPage({ daoId }: { daoId: string }) {
  useAuthorizedAccess();
  return (
    <div className="w-full">
      <PageTabs daoId={daoId} activeTab={PageTab.PROPOSAL} />
      <div className="w-full flex items-center flex-col">
        <ProposalsList daoId={daoId} />
      </div>
    </div>
  );
}
