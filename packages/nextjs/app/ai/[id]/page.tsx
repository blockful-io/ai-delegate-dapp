/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useState } from "react";
import { AI, getAI } from "~~/services/ai/getAIs";

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-unused-vars */

const AI_SKELETONS_NUMBER = 1;

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params, searchParams }: Props) {
  const [ai, setAI] = useState<AI>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    try {
      const ai = getAI(params.id);
      setAI(ai);
    } catch (error: unknown) {
      setError(String(error));
    }

    setLoading(false);
  }, []);

  // TODO: fetch information of wether the connectedAddress has delegated votes to some loaded AI or not
  const delegateVotes = (ai: AI) => {
    // TODO: delegate votes to the selected AI
    alert(`Implement delegate votes to AI: ${ai.name}`);
  };

  return (
    <div className="w-full md:w-[70%] lg:w-[50%] mx-auto my-20">
      {loading ? (
        <div className="flex flex-col gap-10">
          {Array.from({ length: AI_SKELETONS_NUMBER }).map((_, index) => {
            return <div key={index} className="w-full bg-gray-200 animate-pulse h-10"></div>;
          })}
        </div>
      ) : error ? (
        <div>
          <h1>Error: {error}</h1>
        </div>
      ) : ai ? (
        <>
          <div className="w-full border border-gray-300 p-4 my-4">
            <div className="flex justify-between">
              <h1>{ai.name}</h1>
            </div>
            <div>
              <div className="flex space-x-4">
                <p>Bias: {ai.biasSummary}</p>
                <p>Voting Power: {ai.votingPower}</p>
              </div>
            </div>
            <div className="w-full flex justify-between">
              <a className="border bg-gray-200 text-black p-1 px-2" href={"/ai/" + ai.id}>
                See details
              </a>
              <button onClick={() => delegateVotes(ai)} className="border bg-gray-200 text-black p-0.5 px-2">
                {
                  // TODO: change the button text to "Revoke" if the connectedAddress has delegated votes to this AI
                  "Delegate"
                }
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
