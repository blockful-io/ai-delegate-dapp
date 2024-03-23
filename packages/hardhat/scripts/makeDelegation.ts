import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";
import { tokenAbi } from "./abi";
import { tokenAddress } from "./utils";

async function makeDelegation(delegatee: string) {
  const account = privateKeyToAccount("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");

  const client = createWalletClient({
    account,
    chain: hardhat,
    transport: http("http://127.0.0.1:8545/"),
  }).extend(publicActions);

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
