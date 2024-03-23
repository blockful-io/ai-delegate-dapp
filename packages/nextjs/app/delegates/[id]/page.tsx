"use client";

import { useEffect, useState } from "react";
import useDelegateVote from "~~/hooks/useDelegateVote";
import { AI, getAI } from "~~/services/ai/getAIs";

const AI_SKELETONS_NUMBER = 1;

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  const [ai, setAI] = useState<AI>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { delegateVote, isDelegated, revokeVote } = useDelegateVote();

  useEffect(() => {
    async function asyncGetAi() {
      setLoading(true);
      setAI(await getAI(params.id));
    }

    asyncGetAi()
      .then(() => setLoading(false))
      .catch(e => setError(String(e)));
  }, [params.id]);

  useEffect(() => {
    setLoading(delegateVote.isLoading || revokeVote.isLoading);
  }, [delegateVote.isLoading, revokeVote.isLoading]);

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
              {isDelegated ? (
                <button
                  onClick={() =>
                    revokeVote.write({
                      args: ai.id,
                    })
                  }
                  className="border bg-gray-200 text-black p-0.5 px-2"
                >
                  Revoke
                </button>
              ) : (
                <button
                  onClick={() =>
                    delegateVote.write({
                      args: ai.id,
                    })
                  }
                  className="border bg-gray-200 text-black p-0.5 px-2"
                >
                  Delegate
                </button>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
