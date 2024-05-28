import { useState } from "react";
import { useRouter } from "next/navigation";
import useDelegate from "@/lib/hooks/useDelegate";

export const FormCreateAI = () => {
  const [name, setName] = useState("");
  const [bias, setBias] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { createDelegate } = useDelegate();

  const postAI = async () => {
    try {
      setLoading(true);
      await createDelegate({ name, summary: bias });
      router.replace("/delegates");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={postAI}>
      <div className="flex flex-col ">
        <label htmlFor="name " className="mb-4 text-[#A0A1A5]">
          AI name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          id="name"
          placeholder="Smart AI"
          className="p-4 bg-[#323439] rounded-md text-white"
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-center">
          <label htmlFor="summary" className="text-[#A0A1A5]">
            Prompt
          </label>
          <p className="text-[#A0A1A5]">{bias.length} / 250</p>
        </div>
        <textarea
          onChange={(e) => setBias(e.target.value)}
          placeholder="Use this prompt to define how this AI should decide its votes."
          className="p-4 mb-4 bg-[#323439] rounded-md text-white"
          name="summary"
          id="summary"
          cols={30}
          rows={10}
        ></textarea>
        <input
          className="border bg-[#B1FF6F] rounded-[100px] border-gray-300 py-4 max-h-[54px] items-center flex justify-center"
          onSubmit={postAI}
          type="submit"
          value="Create"
        />
      </div>
    </form>
  );
};
