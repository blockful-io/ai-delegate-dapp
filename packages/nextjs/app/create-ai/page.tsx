/* eslint-disable prettier/prettier */
"use client";

import { useState } from "react";
import type { NextPage } from "next";

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

// const POST_AI_URL = "https://api.example.com/ai";

const CreateAI: NextPage = () => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");

  const postAI = () => {
    // TODO: post the new AI to the server
    // const response = fetch("https://api.example.com/ai", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     summary,
    //   }),
    // });
    alert(`Implement AI creation POST request: ${name}`);
  };

  return (
    <div className="w-full justify-center items-center my-20 flex flex-col gap-10">
      <h1>New AI delegate</h1>
      <form className="flex flex-col gap-4" onSubmit={postAI}>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-4">
            AI name
          </label>
          <input
            onChange={e => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            placeholder="AI name"
            className="p-4"
          />
        </div>

        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between items-center">
            <label htmlFor="summary">Prompt</label>
            <p>{summary.length} / 250</p>
          </div>
          <textarea
            onChange={e => setSummary(e.target.value)}
            placeholder="Use this prompt to define how this AI should decide its votes."
            className="p-4 mb-4"
            name="summary"
            id="summary"
            cols={30}
            rows={10}
          ></textarea>
          <input className="border border-gray-300 py-2" onSubmit={postAI} type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
};

export default CreateAI;
