"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { AIsList } from "~~/components/AIsList";
import { Footer } from "~~/components/Footer";
import { Header, HeaderVariant } from "~~/components/Header";
import useDelegates, { AI } from "~~/hooks/useDelegates";

const AI_SKELETONS_NUMBER = 6;

const Delegate: NextPage = () => {
  const [ais, setAIs] = useState<AI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchDelegates, delegate } = useDelegates();

  useEffect(() => {
    setLoading(true);
    fetchDelegates()
      .then(setAIs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function onDelegate(address: string) {
    setLoading(true);
    await delegate({ address });
    setLoading(false);
  }

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
    <div className="w-full">
      <Header variant={HeaderVariant.DEFAULT} />
      <div className="w-full flex items-center flex-col ">
        <h1 className="my-5 text-[#F6F9F6] w-full flex">Delegate to biased AI</h1>
        <AIsList delegates={ais} onDelegate={onDelegate} />
      </div>
      <Footer />
    </div>
  );
};

export default Delegate;
