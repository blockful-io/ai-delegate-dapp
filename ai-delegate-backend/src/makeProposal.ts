import { governorAbi } from "./abi/governor";
import { emptyCall, governorAddress, zeroEther } from "./utils/constants";
import { client } from "./utils";

async function makeProposal(proposal: string) {
  const { request } = await client.simulateContract({
    address: governorAddress,
    abi: governorAbi,
    functionName: "propose",
    args: [[governorAddress], [zeroEther], [emptyCall], proposal],
  });

  await client.writeContract(request);
}

import { randomBytes } from 'crypto';

function generateRandomString(length: number): string {
  return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

const randomProposal = generateRandomString(20); // Gera uma string aleatória de 20 caracteres
makeProposal(randomProposal).catch(error => {
  console.error(error);
  process.exitCode = 1;
});

