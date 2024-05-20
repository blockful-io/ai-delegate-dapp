/* eslint-disable react-hooks/exhaustive-deps */
import { AIDelegateCard } from "../02-molecules";
import { useEffect, useState } from "react";
import { DefaultErrorMessage, DelegateCardSkeleton } from "../01-atoms";
import useDelegates, { SummarizedAI } from "../../lib/hooks/useDelegates";

export const DelegatesList = () => {
  const { fetchDelegates } = useDelegates();
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
    <div className="w-full h-full flex flex-grow">
      <div className="w-full h-full flex items-center flex-col flex-grow">
        <h1 className="my-6 text-[#F6F9F6] w-full flex text-2xl space-grotesk">
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
            <div className="flex-col space-y-3">
              <DefaultErrorMessage />
            </div>
          ) : (
            <div className="w-full gap-3 flex justify-center flex-wrap">
              {delegatesList.map((delegate) => (
                <AIDelegateCard key={delegate.id} {...delegate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
