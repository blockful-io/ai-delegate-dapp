"use client";

import { useEffect, useState } from "react";
import { Address as AddressType, getAddress, isAddress } from "viem";
import { useEnsAvatar, useEnsName } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";

type AddressProps = {
  address?: AddressType;
  disableAddressLink?: boolean;
  format?: "short" | "long";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
};

const blockieSizeMap = {
  xs: 6,
  sm: 7,
  base: 8,
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
};

/**
 * Displays an address (or ENS) with a Blockie image and option to copy address.
 */
export const AddressWalletIcon = ({ address, format, size = "base" }: AddressProps) => {
  const [ens, setEns] = useState<string | null>();
  const [ensAvatar, setEnsAvatar] = useState<string | null>();
  const checkSumAddress = address ? getAddress(address) : undefined;

  const { data: fetchedEns } = useEnsName({
    address: checkSumAddress,
    enabled: isAddress(checkSumAddress ?? ""),
    chainId: 1,
  });
  const { data: fetchedEnsAvatar } = useEnsAvatar({
    name: fetchedEns,
    enabled: Boolean(fetchedEns),
    chainId: 1,
    cacheTime: 30_000,
  });

  // We need to apply this pattern to avoid Hydration errors.
  useEffect(() => {
    setEns(fetchedEns);
  }, [fetchedEns]);

  useEffect(() => {
    setEnsAvatar(fetchedEnsAvatar);
  }, [fetchedEnsAvatar]);

  // Skeleton UI
  if (!checkSumAddress) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isAddress(checkSumAddress)) {
    return <span className="text-error">Wrong address</span>;
  }

  let displayAddress = checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4);

  if (ens) {
    displayAddress = ens;
  } else if (format === "long") {
    displayAddress = checkSumAddress;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0">
        <BlockieAvatar
          address={checkSumAddress}
          ensImage={ensAvatar}
          size={(blockieSizeMap[size] * 24) / blockieSizeMap["base"]}
        />
      </div>
      {displayAddress}
    </div>
  );
};
