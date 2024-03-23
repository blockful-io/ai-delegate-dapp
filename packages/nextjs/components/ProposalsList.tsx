import { useCallback, useEffect, useState } from "react";
import {
  createPublicClient,
  decodeFunctionResult,
  encodeAbiParameters,
  encodeFunctionData,
  http,
  parseAbiItem,
} from "viem";
import { localhost, mainnet } from "viem/chains";
import deployedContracts from "~~/contracts/deployedContracts";
import { Proposal, getProposals } from "~~/services/web3/getProposals";

const PROPOSALS_SKELETONS_NUMBER = 6;

export const ProposalsList = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const publicClient = createPublicClient({
    chain: localhost,
    transport: http(),
  });

  const filterEvents = useCallback(async () => {
    setLoading(true);
    const contract = deployedContracts[31337].YourContract;

    const events = await publicClient.getContractEvents({
      abi: contract.abi,
      address: contract.address,
      eventName: "GreetingChange",
    });

    for (const ev of events.slice(0, 5)) {
      const data = encodeFunctionData({
        abi: contract.abi,
        functionName: "greeting",
      });

      const response = await publicClient.call({
        to: contract.address,
        data,
      });

      console.log({ response });
      if (response.data) {
        const output = decodeFunctionResult({
          abi: contract.abi,
          functionName: "greeting",
          data: response.data,
        });

        console.log({ output });
      }
    }

    console.log({ events });
  }, [publicClient]);

  useEffect(() => {
    filterEvents()
      .then(() => setLoading(false))
      .catch(setError);
  }, [filterEvents]);

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        {Array.from({ length: PROPOSALS_SKELETONS_NUMBER }).map((_, index) => {
          return <div key={index} className="w-full bg-gray-200 animate-pulse h-10"></div>;
        })}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F6F9F6]">
      <>
        {proposals.map(proposal => {
          return (
            <div key={proposal.id} className="border border-gray-300 p-4 my-4">
              <div className="flex justify-between">
                <h1>{proposal.name}</h1>
                <span>{proposal.status}</span>
              </div>
              <div>
                <div className="flex space-x-4">
                  <p>Yes: {proposal.proVotes.length}</p>
                  <p>No: {proposal.conVotes.length}</p>
                </div>
              </div>
              <a className="border text-black bg-gray-200 p-1" href={`/proposals/${proposal.id}`}>
                See details
              </a>
            </div>
          );
        })}
      </>
    </div>
  );
};
