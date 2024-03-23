"use client";

import React from "react";
import { StormIcon } from "./01-atoms";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export const Header = () => {
  return (
    <div className="top-0 bg-base-100 min-h-0 justify-between z-20 py-5">
      <div className="flex justify-between w-full items-center">
        <StormIcon />
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
