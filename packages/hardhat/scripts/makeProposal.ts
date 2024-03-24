import { governorAbi } from "./abi";
import { client, emptyCall, governorAddress, zeroEther } from "./utils";

async function makeProposal(proposal: string) {
  const { request } = await client.simulateContract({
    address: governorAddress,
    abi: governorAbi,
    functionName: "propose",
    args: [[governorAddress], [zeroEther], [emptyCall], proposal],
  });

  await client.writeContract(request);
}

makeProposal("Von deploya contrato novo").catch(error => {
  console.error(error);
  process.exitCode = 1;
});
