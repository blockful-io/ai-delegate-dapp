import { useCallback } from "react";
import { createPublicClient, encodeFunctionData, http } from "viem";
import { localhost } from "viem/chains";
import deployedContracts from "~~/contracts/deployedContracts";

export interface Proposal {
  id: string;
  name: string;
  txHash?: string;
  summary: string;
  status: "Executed" | "Queued" | "Defeated" | "Succeeded";
  proVotes: Vote[];
  conVotes: Vote[];
}

export interface Vote {
  id: string;
  address: string;
  votes: number;
}

const useProposals = () => {
  const publicClient = createPublicClient({
    chain: localhost,
    transport: http(),
  });
  const contract = deployedContracts[31337].YourContract;

  const getLastProposals = useCallback(async (): Promise<Proposal[]> => {
    const events = await publicClient.getContractEvents({
      abi: contract.abi,
      address: contract.address,
      eventName: "GreetingChange",
    });

    console.log({ events });
    return events.map(ev => ({
      id: "1",
      name: ev.args.newGreeting!,
      summary: "b",
      proVotes: [],
      conVotes: [],
      status: "Queued",
    }));
  }, [publicClient, contract]);

  const getProposal = useCallback(
    async ({ id }: Pick<Proposal, "id">): Promise<Proposal> => {
      const event = await publicClient.getContractEvents({
        abi: contract.abi,
        address: contract.address,
        eventName: "GreetingChange",
        args: { greetingSetter: id },
      });

      if (event.length == 0) {
        throw "proposal not found";
      }

      const args = event[0].args;

      return {
        id: "1",
        name: args.greetingSetter!,
        summary: "b",
        proVotes: [],
        conVotes: [],
        status: "Queued",
      };
    },
    [publicClient, contract],
  );

  const createProposal = useCallback(
    async ({ name }: Pick<Proposal, "name" | "summary">): Promise<void> => {
      const data = encodeFunctionData({
        abi: contract.abi,
        functionName: "setGreeting",
        args: [name],
      });

      const response = await publicClient.call({
        to: contract.address,
        data,
      });
      console.log({ response });
    },
    [publicClient, contract],
  );

  return { getLastProposals, getProposal, createProposal };
};

export default useProposals;
