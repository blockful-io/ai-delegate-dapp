import { BackButton, WalletIcon } from "../01-atoms";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { UserDropdown } from "./UserDropdown";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export const TheHeader = () => {
  const router = useRouter();

  return (
    <div className="mb-8 top-0 bg-base-100 min-h-0 justify-between z-20">
      <div className="flex justify-between w-full items-center">
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
              "text-black flex items-center space-x-3 px-4 py-2 bg-[#B1FF6F] rounded-full text-semibold text-base hover:bg-[#81dd37] transition-colors duration-200 ease-in-out";

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
                  <span className="inter font-semibold">Connect</span>
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
      </div>
      {router.pathname !== "/" && <BackButton />}
    </div>
  );
};
