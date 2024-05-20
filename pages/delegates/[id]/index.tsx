/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  DefaultErrorMessage,
  DelegateCardSkeleton,
} from "@/components/01-atoms";
import useDelegates, { SummarizedAI } from "@/lib/hooks/useDelegates";

export default function AIDelegatePage({ id }: { id: string }) {
  const { fetchDelegate } = useDelegates();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [delegate, setDelegate] = useState<SummarizedAI | null>(null);

  useEffect(() => {
    setError(null);

    fetchDelegate({ id })
      .then((delegate: SummarizedAI) => {
        setDelegate(delegate);
      })
      .catch((e: unknown) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const PageContent = (children: JSX.Element) => {
    return (
      <div className="w-full">
        <div className="w-full flex items-center flex-col">
          <div className="flex w-full items-center">
            <h1 className="pt-5 my-6 text-[#F6F9F6] w-full flex md:justify-center space-grotesk text-2xl">
              Delegate details page
            </h1>
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (loading) {
    return PageContent(
      <div className="flex flex-col gap-10">
        <DelegateCardSkeleton />
      </div>
    );
  }

  if (error) {
    return PageContent(
      <div className="flex flex-col gap-10">
        <DefaultErrorMessage />
      </div>
    );
  }

  return PageContent(
    <div className="flex flex-col space-y-3">
      <h3>{delegate?.id}</h3>
      <h4>{delegate?.address}</h4>
      <p>{delegate?.summary}</p>
    </div>
  );
}
