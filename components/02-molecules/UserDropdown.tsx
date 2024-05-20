/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEnsAvatar, useEnsName } from "wagmi";
import { useUser } from "@/lib/hooks/useUser";
import { ADDRESS_ZERO } from "@/lib/mocks";
import { useEffect } from "react";
import { mainnetChainConfig } from "@/lib/wallet-config";

export const UserDropdown = () => {
  const { authedUser, loadingAuthenticatedUser, disconnectUser } = useUser();
  const { data: ensName, refetch: fetchEnsName } = useEnsName({
    address: authedUser ?? ADDRESS_ZERO,
    config: mainnetChainConfig,
    chainId: 1,
  });

  useEffect(() => {
    if (authedUser) fetchEnsName();
  }, [authedUser]);

  const {
    data: ensAvatar,
    isLoading: isLoadingAvatar,
    refetch: fetchEnsAvatar,
  } = useEnsAvatar({
    name: ensName ?? "",
    config: mainnetChainConfig,
    chainId: 1,
  });

  useEffect(() => {
    if (ensName) fetchEnsAvatar();
  }, [ensName]);

  return (
    <button
      className="flex space-x-3 items-center cursor-pointer"
      onClick={() => disconnectUser()}
    >
      <div style={{ width: "24px", height: "24px" }}>
        {ensAvatar ? (
          <img
            src={ensAvatar}
            alt="ENS domain avatar"
            className="rounded-full"
          />
        ) : isLoadingAvatar && ensName ? (
          <div className="w-full h-full relative block rounded-full bg-gray-300"></div>
        ) : (
          <div className="w-full h-full rounded-full bg-[#B1FF6F]"></div>
        )}
      </div>
      {loadingAuthenticatedUser ? (
        <div className="w-20 h-3 rounded-lg bg-gray-50 animate-pulse"></div>
      ) : (
        <p className="text-sm">
          {ensName
            ? ensName
            : authedUser?.slice(0, 6) + "..." + authedUser?.slice(-4)}
        </p>
      )}
    </button>
  );
};
