"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { XIcon } from "~~/components/01-atoms/XIcon";

// const POST_AI_URL = "https://api.example.com/ai";

const CreateProposal: NextPage = () => {
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
    <div className="w-full">
      <div className="w-full flex items-center  flex-col">
        <div className="flex justify-between w-full ">
          <h1 className="flex">New Proposal</h1>
          <button className="flex">
            <XIcon />
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={postAI}>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-4">
              Title
            </label>
            <input
              onChange={e => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              placeholder="Proposal title"
              className="p-4"
            />
          </div>

          <div className="w-full flex flex-col">
            <div className="w-full flex justify-between items-center">
              <label htmlFor="summary">Content</label>
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
            <input className="border border-gray-300 py-2" onSubmit={postAI} type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProposal;
