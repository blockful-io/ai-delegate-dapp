/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  DefaultErrorMessage,
  DelegateCardSkeleton,
} from "@/components/01-atoms";
import useDelegate, { SummarizedAI } from "@/lib/hooks/useDelegate";
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
  const { fetchDelegate, fetchDelegateVotes } = useDelegate();
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
    <>
      <div className="flex flex-col space-y-3 w-full">
        <h3 className="space-x-2 flex flex-wrap">
          <p className="underline underline-offset-1">ID____</p>
          <p>{delegate?.id}</p>
        </h3>
        <h1 className="space-x-2 flex flex-wrap">
          <p className="underline underline-offset-1">Name____</p>
          <p>{delegate?.name}</p>
        </h1>
        <h3 className="space-x-2 flex flex-col space-y-2 flex-wrap">
          <p className="underline underline-offset-1">Address____</p>
          <p className="break-all">{delegate?.address}</p>
        </h3>
        <p className="space-x-2 flex flex-col space-y-2 flex-wrap">
          <p className="underline underline-offset-1">Bias summary____</p>
          <p className="break-word">{delegate?.summary}</p>
        </p>
      </div>
      <div className="mt-20">
        {Array.isArray(delegateVotes) && delegateVotes.length ? (
          <div>
            <h3 className="underline underline-offset-1">Votes</h3>
            <ul>
              {delegateVotes.map((vote) => (
                <li key={vote.id}>
                  {vote.type} - {vote.voter}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="border-[#99E24E] border flex p-2 rounded-lg space-x-2 text-sm">
            Note____ this AI Delegate has not voted in DAO proposals yet.
            Delegate votes to see it voting in the next DAO proposal!
          </p>
        )}
      </div>
    </>
  );
}
