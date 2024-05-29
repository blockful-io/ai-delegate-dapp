import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PageTab, PageTabs } from "@/components/02-molecules";
import { DelegatesList } from "@/components/03-organisms";

const AI_SKELETONS_NUMBER = 6;

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

export default function DelegatesPage({ daoId }: { daoId: string }) {
  return (
    <div className="w-full">
      <PageTabs daoId={daoId} activeTab={PageTab.DELEGATES} />
      <div className="w-full flex items-center flex-col">
        <DelegatesList daoId={daoId} />
      </div>
    </div>
  );
}
