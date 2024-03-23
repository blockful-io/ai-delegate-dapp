"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { StormIcon } from "./01-atoms";
import { XIcon } from "./01-atoms/XIcon";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export enum HeaderVariant {
  DEFAULT = "DEFAULT",
  SECONDARY = "SECONDARY",
}
interface Variant {
  variant: HeaderVariant;
}

export const Header = ({ variant }: Variant) => {
  const router = useRouter();
  return variant === HeaderVariant.DEFAULT ? (
    <div className="top-0 bg-base-100 min-h-0 justify-between z-20  pb-5">
      <div className="flex justify-between w-full items-center">
        <StormIcon />
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  ) : (
    <div className="top-0 bg-base-100 min-h-0 justify-between z-20  pb-5">
      <div className="flex justify-between w-full items-center">
        <h1 className="my-5 text-[#F6F9F6]">New Proposal</h1>
        <button
          className="flex"
          onClick={() => {
            router.push("/");
          }}
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
};
