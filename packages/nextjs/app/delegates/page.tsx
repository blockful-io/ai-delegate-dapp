"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { AIsList } from "~~/components/AIsList";
import useDelegates, { AI } from "~~/hooks/useDelegates";

const AI_SKELETONS_NUMBER = 6;

const Delegate: NextPage = () => {
  const [ais, setAIs] = useState<AI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchDelegates } = useDelegates();

  useEffect(() => {
    setLoading(true);
    fetchDelegates()
      .then(setAIs)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error...</h1>
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
      <AIsList delegates={ais} />
    </div>
  );
};

export default Delegate;
