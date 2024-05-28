import Link from "next/link";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useDelegate, { SummarizedAI } from "@/lib/hooks/useDelegate";
import { AIsList } from "@/components/02-molecules";
import { DefaultErrorMessage } from "@/components/01-atoms";
import { useAuthorizedAccess } from "@/lib/hooks/useAuthorizedAccess";

const AI_SKELETONS_NUMBER = 6;

const Delegate: NextPage = () => {
  // useAuthorizedAccess();

  const [ais, setAIs] = useState<SummarizedAI[]>([]);
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);
  const { fetchDelegates } = useDelegate();

  useEffect(() => {
    fetchDelegates()
      .then((delegates: SummarizedAI[]) => {
        setAIs(delegates);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchDelegates]);

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        {Array.from({ length: AI_SKELETONS_NUMBER }).map((_, index) => {
          return (
            <div
              key={index}
              className="w-full bg-gray-200 animate-pulse h-10"
            ></div>
          );
        })}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-10">
        <DefaultErrorMessage />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full flex items-center flex-col">
        <div className="flex w-full items-center">
          <h1 className="my-5 text-[#F6F9F6] w-full flex md:justify-center">
            Delegate to biased AI
          </h1>
          <Link
            href={"/create-api"}
            className="border text-black bg-[#B1FF6F] rounded-[100px] px-4 w-[95px] h-10"
          >
            + New
          </Link>
        </div>

        <AIsList delegates={ais} />
      </div>
    </div>
  );
};

export default Delegate;
