import { tokenAbi } from "./abi";
import { client, tokenAddress } from "./utils";

async function makeDelegation(delegatee: string) {
  const { request } = await client.simulateContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "delegate",
    args: [delegatee],
  });

  await client.writeContract(request);
}

makeDelegation("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266").catch(error => {
  console.error(error);
  process.exitCode = 1;
});
