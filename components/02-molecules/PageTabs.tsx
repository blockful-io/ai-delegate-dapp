/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import cc from "classcat";
import Link from "next/link";
import { ArrowIcon } from "../01-atoms";
import useDao, { DAO } from "@/lib/hooks/useDao";

export enum PageTab {
  PROPOSAL,
  DELEGATES,
  NONE,
}

export const PageTabs = ({
  activeTab,
  daoId,
}: {
  activeTab: PageTab;
  daoId: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [dao, setDao] = useState<DAO | null>(null);
  const { fetchDaoConstitution } = useDao();

  useEffect(() => {
    if (!daoId) return;

    fetchDaoConstitution({ id: Number(daoId) })
      .then((constitution) => {
        setDao(constitution);
      })
      .catch((e: unknown) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [daoId]);

  return (
    <div className="w-full pt-10">
      <div className="flex gap-2">
        <Link
          href={`/dao/${daoId}/proposals`}
          className={cc([
            "p-3 w-full gap-2 h-10 items-center flex justify-center rounded-[100px] text-[#F6F9F6] hover:outline hover:outline-[#F6F9F626]",
            activeTab === PageTab.PROPOSAL && "bg-[#F6F9F626]",
          ])}
        >
          {activeTab === PageTab.PROPOSAL && (
            <ArrowIcon className="text-white w-5" />
          )}
          Proposals
        </Link>
        <Link
          href={`/dao/${daoId}/delegates`}
          className={cc([
            "p-3 w-full gap-2 h-10 items-center flex justify-center  rounded-[100px] text-[#F6F9F6] hover:outline hover:outline-[#F6F9F626]",
            activeTab === PageTab.DELEGATES && "bg-[#F6F9F626]",
          ])}
        >
          {activeTab === PageTab.DELEGATES && (
            <ArrowIcon className="text-white w-5" />
          )}
          Delegates
        </Link>
      </div>

      <h1 className="text-3xl font-black mt-6 text-center text-[#B1FF6F]">
        Welcome to {dao?.name || "____"} page
      </h1>

      {activeTab !== PageTab.NONE && dao && (
        <Link
          className="w-full justify-center items-center flex p-6 pb-0 underline underline-offset-4 hover:underline-offset-2 transition hover:text-[#B1FF6F]"
          href={`/dao/${daoId}`}
        >
          {dao?.name} constitution
        </Link>
      )}
    </div>
  );
};
