"use client";

import { useEffect, useState } from "react";
import DelegateButton from "~~/components/DelegateButton";
import RevokeButton from "~~/components/RevokeButton";
import useDelegates, { AI } from "~~/hooks/useDelegates";

const AI_SKELETONS_NUMBER = 1;

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  const [ai, setAI] = useState<AI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchDelegate } = useDelegates();

  useEffect(() => {
    setLoading(true);

    fetchDelegate({ id: params.id })
      .then(setAI)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        {Array.from({ length: AI_SKELETONS_NUMBER }).map((_, index) => {
          return <div key={index} className="w-full bg-gray-200 animate-pulse h-10"></div>;
        })}
      </div>
    );
  }

  if (error || !ai) {
    return (
      <div>
        <h1>Error...</h1>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[70%] lg:w-[50%] mx-auto my-20">
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
          {ai.delegated ? <RevokeButton id={ai.id} /> : <DelegateButton id={ai.id} />}
        </div>
      </div>
    </div>
  );
}
