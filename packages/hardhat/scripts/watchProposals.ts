import { governorAbi } from "./abi";
import { client, governorAddress } from "./utils";

async function main() {
  const events = client.watchContractEvent({
    abi: governorAbi,
    address: governorAddress,
    eventName: "ProposalCreated",
    onLogs: logs => console.log(logs),
  });
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
