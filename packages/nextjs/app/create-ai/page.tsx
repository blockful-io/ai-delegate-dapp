/* eslint-disable prettier/prettier */
"use client";

import type { NextPage } from "next";
import { FormCreateAI } from "~~/components/01-atoms/FormCreateAI";
import { Footer } from "~~/components/Footer";
import { Header, HeaderVariant } from "~~/components/Header";

/* eslint-disable prettier/prettier */

const CreateAI: NextPage = () => {
  return (
    <div className="w-full">
      <Header variant={HeaderVariant.DEFAULT} />
      <div className="w-full flex items-center flex-col ">
        <h1 className="my-5 text-[#F6F9F6] w-full flex">New AI Delegate</h1>
        <FormCreateAI />
      </div>
      <Footer />
    </div>
  );
};

export default CreateAI;
