"use client";

import type { NextPage } from "next";
import { AIsList } from "~~/components/AIsList";

const Delegate: NextPage = () => {
  return (
    <div className="w-full md:w-[70%] lg:w-[50%] mx-auto my-20">
      <div>
        <h1 className="my-5">Delegate to biased AI</h1>
      </div>
      <AIsList />
    </div>
  );
};

export default Delegate;
