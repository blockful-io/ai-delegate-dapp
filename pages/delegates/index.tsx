import Link from "next/link";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useDelegates, { SummarizedAI } from "@/lib/hooks/useDelegates";
import { AIDelegateCard, DefaultErrorMessage } from "@/components/01-atoms";
import { AIsList, PageTab, PageTabs } from "@/components/02-molecules";
import { AIDelegates } from "@/lib/mocks";

const AI_SKELETONS_NUMBER = 6;

const Delegates: NextPage = () => {
  const [ais, setAIs] = useState<SummarizedAI[]>([]);
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);
  const { fetchDelegates } = useDelegates();

  useEffect(() => {
    fetchDelegates()
      .then((delegates) => {
        setAIs(delegates);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchDelegates]);

  const PageContent = (children: JSX.Element) => {
    return (
      <div className="w-full">
        <PageTabs activeTab={PageTab.DELEGATES} />
        <div className="w-full flex items-start flex-col">
          <div className="flex w-full items-center">
            <h1 className="pt-5 my-6 text-[#F6F9F6] w-full flex md:justify-start space-grotesk text-2xl">
              Delegate to biased AI
            </h1>
            {!error && !loading && (
              <Link
                href={"/create-api"}
                className="border text-black bg-[#B1FF6F] rounded-[100px] px-4 w-[95px] h-10"
              >
                + New
              </Link>
            )}
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (loading) {
    return PageContent(
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
    return PageContent(
      <div className="flex flex-col gap-10">
        <DefaultErrorMessage />
      </div>
    );
  }

  return PageContent(<AIsList delegates={ais} />);
};

export default Delegates;
