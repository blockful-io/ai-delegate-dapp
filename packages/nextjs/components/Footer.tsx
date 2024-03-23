import React from "react";
import { useRouter } from "next/navigation";
import { AccountWalletIcon } from "./01-atoms";
import { ArrowIcon } from "./01-atoms/ArrowIcon";
import { RobotIcon } from "./01-atoms/RobotIcon";

/**
 * Site footer
 */
export const Footer = () => {
  const router = useRouter();

  return (
    <div className="w-full ">
      <div className="flex gap-2">
        <button
          className="px-1 bg-[#F6F9F626] w-full gap-2 h-10 items-center flex justify-center rounded-[100px] text-[#F6F9F6]"
          onClick={() => router.push("/")}
        >
          <AccountWalletIcon className="text-white" />
          Proposals
        </button>
        <button
          className="w-full gap-2 h-10 items-center flex justify-center text-[#F6F9F6]"
          onClick={() => router.push("/delegate")}
        >
          <ArrowIcon className="text-white" />
          Delegate
        </button>
        <button
          className="w-full gap-2 h-10 items-center flex justify-center  text-[#F6F9F6]"
          onClick={() => router.push("/create-ia")}
        >
          <RobotIcon className="text-white" />
          AI Profile
        </button>
      </div>
    </div>
  );
};
