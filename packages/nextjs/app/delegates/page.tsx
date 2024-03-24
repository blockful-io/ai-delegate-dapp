"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { AIsList } from "~~/components/AIsList";
import { ActiveTab, Footer } from "~~/components/Footer";
import { Header, HeaderVariant } from "~~/components/Header";
import useDelegates, { AI } from "~~/hooks/useDelegates";

const AI_SKELETONS_NUMBER = 6;

const Delegate: NextPage = () => {
  const [ais, setAIs] = useState<AI[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchDelegates } = useDelegates();

  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    fetchDelegates()
      .then(setAIs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
        <div className="flex w-full items-center">
          <h1 className="my-5 text-[#F6F9F6] w-full flex md:justify-center">Delegate to biased AI</h1>
          <button
            className="border text-black bg-[#B1FF6F] rounded-[100px] px-4 w-[95px] h-10"
            onClick={() => {
              router.push("/create-ai");
            }}
          >
            + New
          </button>
        </div>

        <AIsList delegates={ais} />
      </div>
      <Footer tab={ActiveTab.DELEGATE} />
    </div>
  );
};

export default Delegate;
