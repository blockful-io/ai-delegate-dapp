import { useState } from "react";

export const FormCreateProposal = () => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");

  const postCreateProposal = () => {
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
    <form className="flex flex-col gap-4 w-full" onSubmit={postCreateProposal}>
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-4 text-[#A0A1A5]">
          Title
        </label>
        <input
          onChange={e => setName(e.target.value)}
          type="text"
          name="name"
          id="name"
          placeholder="Proposal title"
          className="p-4 bg-[#323439] rounded-md text-white"
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-center">
          <label htmlFor="summary" className="text-[#A0A1A5]">
            Content
          </label>
          <p className="text-[#A0A1A5]"> {summary.length} / 250</p>
        </div>
        <textarea
          onChange={e => setSummary(e.target.value)}
          placeholder="Use this prompt to create a new Proposal"
          className="p-4 mb-4 bg-[#323439] rounded-md text-white"
          name="summary"
          id="summary"
          cols={30}
          rows={10}
        ></textarea>
        <input
          className="border bg-[#B1FF6F] rounded-[100px] border-gray-300 py-4 max-h-[54px] items-center flex justify-center"
          onSubmit={postCreateProposal}
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
};
