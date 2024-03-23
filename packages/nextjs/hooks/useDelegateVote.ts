import { useScaffoldContractRead, useScaffoldContractWrite } from "./scaffold-eth";
import { parseEther } from "viem";

function useDelegateVote() {
  const delegateVote = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: ["The value to set"],
    value: parseEther("0.1"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const revokeVote = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: ["The value to set"],
    value: parseEther("0.1"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const isDelegated = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "premium",
  });

  return {
    delegateVote,
    revokeVote,
    isDelegated,
  };
}

export default useDelegateVote;
