import React from "react";
import { WalletIcon } from "../01-atoms";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { UserDropdown } from "./UserDropdown";
import Image from "next/image";
import Link from "next/link";

export const TheHeader = () => {
  return (
    <header className="w-full top-0 bg-base-100 justify-between relative z-20">
      <nav className="flex justify-between w-full items-center">
        <Link href={"/"}>
          <Image width={32} height={32} alt="DApp Icon" src={"/DAppIcon.png"} />
        </Link>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              authenticationStatus === "authenticated";

            const notConnectedClassName =
              "cursor-pointer text-black flex items-center space-x-3 px-4 py-2 bg-[#B1FF6F] rounded-full text-semibold text-base hover:bg-[#81dd37] transition-colors duration-200 ease-in-out";

            if (!connected) {
              return (
                <button
                  onClick={(e: any) => {
                    openConnectModal();
                    e.preventDefault();
                  }}
                  type="button"
                  className={notConnectedClassName}
                >
                  <WalletIcon />
                  <span>Connect</span>
                </button>
              );
            }

            const unsupportedChainClassName =
              "inline-flex w-auto flex-shrink-0 appearance-none items-center justify-center space-x-2 rounded-md px-5 py-2.5";

            if (chain.unsupported) {
              return (
                <button
                  onClick={(e: any) => {
                    openChainModal();
                    e.preventDefault();
                  }}
                  type="button"
                  className={unsupportedChainClassName}
                >
                  <span className="flex-shrink-0 text-sm font-medium">
                    Unsupported network
                  </span>
                </button>
              );
            }

            return <UserDropdown />;
          }}
        </ConnectButton.Custom>
      </nav>
    </header>
  );
};
