/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { DefaultErrorMessage, DelegateCardSkeleton } from "../01-atoms";
import useDelegate, { SummarizedAI } from "@/lib/hooks/useDelegate";
import { AIDelegateCard } from "../02-molecules";

export const DelegatesList = () => {
  const { fetchDelegates } = useDelegate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [delegatesList, setDelegatesList] = useState<SummarizedAI[]>([]);

  useEffect(() => {
    setError(null);

    fetchDelegates()
      .then((delegates: SummarizedAI[]) => {
        setDelegatesList(delegates);
      })
      .catch((e: unknown) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full h-full flex flex-grow mb-10">
      <div className="w-full h-full flex items-center flex-col flex-grow">
        <h1 className="font-semibold my-6 text-[#F6F9F6] w-full flex text-2xl space-grotesk justify-center">
          Delegate to biased AI
        </h1>
        <div className="h-max flex-grow w-full">
          {loading ? (
            <div className="w-full flex-col space-y-3">
              <DelegateCardSkeleton />
              <DelegateCardSkeleton />
              <DelegateCardSkeleton />
            </div>
          ) : error ? (
            <div
              className="flex-col space-y-3 p-4 rounded-xl"
              style={{
                border: "1px solid #B1FF6F",
                borderColor: error ? "#FF0000" : loading ? "#EEE" : "#B1FF6F",
              }}
            >
              <DefaultErrorMessage />
            </div>
          ) : (
            <div className="w-full gap-3 flex justify-center flex-wrap max-w-[400px]">
              {delegatesList.map((delegate: SummarizedAI) => (
                <AIDelegateCard key={delegate.id} delegate={delegate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
