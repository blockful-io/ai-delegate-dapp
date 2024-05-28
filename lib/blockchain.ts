import { BaseError, PublicClient, TransactionReceipt } from "viem";
import { SummarizedAI } from "./hooks/useDelegate";
import { publicClient } from "./wallet-config";
import toast from "react-hot-toast";

export const awaitBlockchainTxReceipt = async (
  txHash: `0x${string}`
): Promise<TransactionReceipt> => {
  let txReceipt = {} as TransactionReceipt;

  while (txReceipt.blockHash === undefined) {
    /*
      Since the transaction takes some time to be registered in the blockchain, 
      our code waits for this to happen in order to retrieve a valid TransactionReceipt.
    */
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    if (receipt.blockHash) {
      txReceipt = receipt;
    }
  }

  return txReceipt;
};

export const triggerToastMessageOnBlockchainError = (error: BaseError) => {
  console.error(error);
  if (
    (error as BaseError).message.includes("denied") ||
    (error as BaseError).message.includes("declined") ||
    (error as BaseError).message.includes("rejected")
  ) {
    toast.error("Please accept the transaction.");
  } else {
    toast.error("Error delegating vote, please contact us.");
  }
};

export const getAIDelegateVotingPower = async (
  delegate: SummarizedAI,
  publicClient: PublicClient,
  contract: Record<any, any>
): Promise<bigint> => {
  const getVotesRes = await publicClient.readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: "getVotes",
    args: [delegate.address as `0x${string}`, 0n],
  });

  try {
    const votes = BigInt(getVotesRes as bigint);
    return votes;
  } catch (e) {
    console.error(e);
    return 0n;
  }
};
