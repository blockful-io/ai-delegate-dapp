import React from "react";
import { useRouter } from "next/navigation";
import { AccountWalletIcon } from "./01-atoms";
import { ArrowIcon } from "./01-atoms/ArrowIcon";
import cc from "classcat";

export enum ActiveTab {
  PROPOSAL = "HOME",
  DELEGATE = "DELEGATE",
}
export const Footer = ({ tab }: { tab: ActiveTab }) => {
  const router = useRouter();
  console.log("tab", tab);
  return (
    <div className="w-full  pt-10">
      <div className="flex gap-2">
        <button
          className={cc([
            "px-1 w-full gap-2 h-10 items-center flex justify-center rounded-[100px] text-[#F6F9F6]",
            tab === ActiveTab.PROPOSAL && "bg-[#F6F9F626]",
          ])}
          onClick={() => {
            router.push("/");
          }}
        >
          <AccountWalletIcon className="text-white" />
          Proposals
        </button>
        <button
          className={cc([
            "w-full gap-2 h-10 items-center flex justify-center  rounded-[100px] text-[#F6F9F6]",
            tab === ActiveTab.DELEGATE && "bg-[#F6F9F626]",
          ])}
          onClick={() => {
            router.push("/delegates");
          }}
        >
          <ArrowIcon className="text-white" />
          Delegate
        </button>
      </div>
    </div>
  );
};
