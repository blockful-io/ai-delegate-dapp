"use client";

import { useCallback } from "react";
import { createPublicClient, createWalletClient, custom, encodeFunctionData, http, publicActions } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";

const useDelegate = () => {
  const { address } = useAccount();
  const walletClient = createWalletClient({
    account: address,
    chain: sepolia,
    transport: custom(window.ethereum!),
  }).extend(publicActions);
  const publicClient = createPublicClient({
    chain: sepolia,
    // transport: http(),
    transport: http("https://eth-sepolia.g.alchemy.com/v2/bow93SW8hqPm2T1pRjzWcGdgueB-lvpb"),
  });
  const contract = deployedContracts[publicClient.chain.id].NDCToken;

  const createDelegation = useCallback(async () => {
    const data = encodeFunctionData({
      abi: contract.abi,
      functionName: "delegate",
      args: ["0x5bBEE690c3963A9427af8518Becf70005FAF2B91"],
    });

    if (!address) {
      return;
    }

    await walletClient.sendTransaction({
      to: contract.address,
      data,
      account: address,
    });
  }, [walletClient, contract, address]);

  return { createDelegation };
};

export default useDelegate;
