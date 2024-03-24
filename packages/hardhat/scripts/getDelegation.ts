import { tokenAbi } from "./abi";
import { client, tokenAddress } from "./utils";

// Get the account that the user delegated to.
async function getDelegation(delegator: string) {
  const delegate = await client.readContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "delegates",
    args: [delegator as `0x${string}`],
  });

  return delegate;
}

getDelegation("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266").catch(error => {
  console.error(error);
  process.exitCode = 1;
});
