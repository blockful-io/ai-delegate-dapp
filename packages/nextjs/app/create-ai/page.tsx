/* eslint-disable prettier/prettier */
"use client";

import type { NextPage } from "next";
import { FormCreateAI } from "~~/components/01-atoms/FormCreateAI";
import { Header, HeaderVariant } from "~~/components/Header";

/* eslint-disable prettier/prettier */

const CreateAI: NextPage = () => {
  return (
    <div className="w-full">
      <Header variant={HeaderVariant.SECONDARY} />
      <div className="w-full flex items-center flex-col ">
        <FormCreateAI />
      </div>
    </div>
  );
};

export default CreateAI;
