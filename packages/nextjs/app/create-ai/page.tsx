"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { createAI } from "~~/services/ai";

const CreateAI: NextPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [bias, setBias] = useState("");
  const [loading, setLoading] = useState(false);

  const postAI = async () => {
    try {
      setLoading(true);
      const ai = await createAI({ name, bias });
      router.push(`/delegates/${ai.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <span>Loading...</span>;
  }

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
            <p>{bias.length} / 250</p>
          </div>
          <textarea
            onChange={e => setBias(e.target.value)}
            placeholder="Use this prompt to define how this AI should decide its votes."
            className="p-4 mb-4"
            name="summary"
            id="summary"
            cols={30}
            rows={10}
          ></textarea>
          <input className="border border-gray-300 py-2" type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
};

export default CreateAI;
