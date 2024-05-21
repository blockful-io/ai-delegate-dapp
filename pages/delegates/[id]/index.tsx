/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  DefaultErrorMessage,
  DelegateCardSkeleton,
} from "@/components/01-atoms";
import useDelegates, { SummarizedAI } from "@/lib/hooks/useDelegates";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const { id } = params || {};

  return {
    props: {
      delegateId: id,
    },
  };
};

export default function AIDelegatePage({ delegateId }: { delegateId: string }) {
  const { fetchDelegate, fetchDelegateVotes } = useDelegates();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [delegate, setDelegate] = useState<SummarizedAI | null>(null);
  const [delegateVotes, setDelegateVotes] = useState<
    Record<string, any>[] | null
  >(null);

  useEffect(() => {
    setError(null);

    fetchDelegate({ id: delegateId })
      .then((delegate: SummarizedAI) => {
        setDelegate(delegate);

        fetchDelegateVotes({ voter: delegate.address as `0x${string}` }).then(
          (votes: Record<string, any>[]) => {
            setDelegateVotes(votes);
          }
        );
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
              Delegate Details
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
    <div className="flex flex-col space-y-3 w-full">
      <h1>Name: {delegate?.name}</h1>
      <h3>ID: {delegate?.id}</h3>
      <h4 style={{ wordBreak: "break-all" }}>Address: {delegate?.address}</h4>
      <p>Bias summary: {delegate?.summary}</p>
      {Array.isArray(delegateVotes) && delegateVotes.length ? (
        <div>
          <h3>Votes</h3>
          <ul>
            {delegateVotes.map((vote) => (
              <li key={vote.id}>
                {vote.type} - {vote.voter}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-50 text-sm mt-10">
          Note: this AI Delegate has not voted in DAO proposals yet
        </p>
      )}
    </div>
  );
}
