import { useState } from "react";
import { useRouter } from "next/navigation";

export const FormCreateProposal = () => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const router = useRouter();

  const postCreateProposal = e => {
    e.preventDefault();
    const proposalID = "0x1";

    // TODO: post the new AI to the server
    // const response = fetch("https://api.example.com/ai", {
    //   method: "POST",x
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     summary,
    //   }),
    // });
    // .then(router.push(createdProposal ))
    // return <CreatedProposalSuccess/>

    window.localStorage.setItem(`${proposalID}-name`, name);
    window.localStorage.setItem(`${proposalID}-summary`, summary);

    router.push(`/proposals/created?id=${proposalID}`);

    // alert(`Implement AI creation POST request: ${name}`);
  };
  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={postCreateProposal}>
      <div className="flex flex-col">
        <div className="w-full flex justify-between items-center">
          <label htmlFor="name" className="text-[#A0A1A5]">
            Title
          </label>
          <p className="text-[#A0A1A5]"> {name.length} / 20</p>
        </div>
        <input
          onChange={e => {
            setName(e.target.value);
            if (e.target.value.length <= 20) {
              setName(e.target.value);
            }
          }}
          name="name"
          id="name"
          placeholder="Proposal title"
          className="p-4 bg-[#323439] rounded-md text-white"
          maxLength={20}
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
          onChange={e => {
            setSummary(e.target.value);
            if (e.target.value.length <= 250) {
              setSummary(e.target.value);
            }
          }}
          placeholder="Use this prompt to create a new Proposal"
          className="p-4 mb-4 bg-[#323439] rounded-md text-white"
          name="summary"
          id="summary"
          cols={30}
          rows={10}
          maxLength={250}
        />
        <input
          className="border bg-[#B1FF6F] rounded-[100px] border-gray-300 py-4 max-h-[54px] items-center flex justify-center"
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
};
