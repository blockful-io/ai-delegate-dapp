import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function DelegateButton({ id }: { id: string }) {
  const { write, isLoading } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: ["The value to set"],
    value: parseEther("0.1"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <button
      onClick={() =>
        write({
          args: id,
        })
      }
      className="border bg-gray-200 text-black p-0.5 px-2"
    >
      Delegate
    </button>
  );
}
