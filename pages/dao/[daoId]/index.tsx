import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PageTab, PageTabs } from "@/components/02-molecules";
import { useAuthorizedAccess } from "@/lib/hooks/useAuthorizedAccess";
import { useEffect, useState } from "react";
import useDao, { DAO } from "@/lib/hooks/useDao";
import { DefaultErrorMessage } from "@/components/01-atoms";

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

export default function DAOPage({ daoId }: { daoId: string }) {
  useAuthorizedAccess();
  const { fetchDaoConstitution } = useDao();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [constitution, setConstitution] = useState<DAO | null>(null);

  useEffect(() => {
    if (!daoId) return;

    fetchDaoConstitution({ id: Number(daoId) })
      .then((constitution) => {
        setConstitution(constitution);
      })
      .catch((e: unknown) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [daoId]);

  const PageContent = (children: JSX.Element) => {
    <div className="w-full">
      <PageTabs daoId={daoId} activeTab={PageTab.NONE} />
      <div className="w-full flex items-center flex-col">{children}</div>
    </div>;
  };

  if (loading) {
    return PageContent(
      <div className="w-10 h-4 rounded-xl bg-gray-300 animate-pulse"></div>
    );
  }

  if (error) {
    return PageContent(<DefaultErrorMessage />);
  }

  return (
    <div className="w-full">
      <PageTabs daoId={daoId} activeTab={PageTab.NONE} />
      <div className="w-full flex items-center flex-col border border-gray-200 rounded-xl mt-10">
        <h1 className="text-2xl font-black mt-4 text-center p-2">
          {constitution?.name} constitution
        </h1>
        <div className="text-white text-justify p-4">
          {constitution?.constitution}
        </div>
      </div>
    </div>
  );
}
