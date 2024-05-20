/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import cc from "classcat";
import { ArrowIcon } from "../01-atoms";
import Link from "next/link";

export enum PageTab {
  PROPOSAL,
  DELEGATES,
}

export const PageTabs = ({ activeTab }: { activeTab: PageTab }) => {
  return (
    <div className="w-full pt-10">
      <div className="flex gap-2">
        <Link
          href={"/delegates"}
          className={cc([
            "p-3 w-full gap-2 h-10 items-center flex justify-center  rounded-[100px] text-[#F6F9F6] cursor-pointer",
            activeTab === PageTab.DELEGATES && "bg-[#F6F9F626]",
          ])}
        >
          {activeTab === PageTab.DELEGATES && (
            <ArrowIcon className="text-white w-5" />
          )}
          Delegates
        </Link>
        <Link
          href={"/proposals"}
          className={cc([
            "p-3 w-full gap-2 h-10 items-center flex justify-center rounded-[100px] text-[#F6F9F6] cursor-pointer",
            activeTab === PageTab.PROPOSAL && "bg-[#F6F9F626]",
          ])}
        >
          {activeTab === PageTab.PROPOSAL && (
            <ArrowIcon className="text-white w-5" />
          )}
          Proposals
        </Link>
      </div>
    </div>
  );
};
