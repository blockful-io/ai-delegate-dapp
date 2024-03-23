import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";
import { governorAbi } from "./abi/governor";
import { emptyCall, governorAddress, zeroEther } from "./utils/constants";

async function makeProposal(proposal: string) {
  const account = privateKeyToAccount("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");

  const client = createWalletClient({
    account,
    chain: hardhat,
    transport: http("http://127.0.0.1:8545/"),
  }).extend(publicActions);

  const { request } = await client.simulateContract({
    address: governorAddress,
    abi: governorAbi,
    functionName: "propose",
    args: [[governorAddress], [zeroEther], [emptyCall], proposal],
  });

  await client.writeContract(request);
}

makeProposal("Von deploya contrato novo 3").catch(error => {
  console.error(error);
  process.exitCode = 1;
});
