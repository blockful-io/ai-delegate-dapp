"use client";

import type { NextPage } from "next";
import { FormCreateAI } from "~~/components/01-atoms/FormCreateAI";
import { ActiveTab, Footer } from "~~/components/Footer";
import { Header, HeaderVariant } from "~~/components/Header";

const CreateAI: NextPage = () => {
  return (
    <div className="w-full">
      <Header variant={HeaderVariant.DEFAULT} />
      <div className="w-full flex items-center flex-col ">
        <h1 className="my-5 text-[#F6F9F6] w-full flex">New AI Delegate</h1>
        <FormCreateAI />
      </div>
      <Footer tab={ActiveTab.PROPOSAL} />
    </div>
  );
};

export default CreateAI;
