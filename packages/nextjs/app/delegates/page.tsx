"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { AIsList } from "~~/components/AIsList";
import { AI, getAIs } from "~~/services/ai/getAIs";

const AI_SKELETONS_NUMBER = 6;

const Delegate: NextPage = () => {
  const [ais, setAIs] = useState<AI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function asyncGetAi() {
      setLoading(true);

      try {
        const ais = await getAIs();
        setAIs(ais);
      } catch (error: unknown) {
        setError(String(error));
      }

      setLoading(false);
    }
    asyncGetAi().catch(console.error);
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error: {error}</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        {Array.from({ length: AI_SKELETONS_NUMBER }).map((_, index) => {
          return <div key={index} className="w-full bg-gray-200 animate-pulse h-10"></div>;
        })}
      </div>
    );
  }

  return (
    <div className="w-full md:w-[70%] lg:w-[50%] mx-auto my-20">
      <div>
        <h1 className="my-5">Delegate to biased AI</h1>
      </div>
      <AIsList delegates={ais} onDelegate={console.log} onRevoke={console.log} delegated={false} />
    </div>
  );
};

export default Delegate;
