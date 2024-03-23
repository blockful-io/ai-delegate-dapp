import { useEffect, useState } from "react";
// import { useAccount } from "wagmi";
import { AI, getAIs } from "~~/services/ai/getAIs";

const AI_SKELETONS_NUMBER = 6;

export const AIsList = () => {
  // const { address: connectedAddress } = useAccount();
  const [ais, setAIs] = useState<AI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    try {
      const ais = getAIs();
      setAIs(ais);
    } catch (error: unknown) {
      setError(String(error));
    }

    setLoading(false);
  }, []);

  // TODO: fetch information of wether the connectedAddress has delegated votes to some loaded AI or not

  const delegateVotes = (ai: AI) => {
    // TODO: delegate votes to the selected AI
    alert(`Implement delegate votes to AI: ${ai.name}`);
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex flex-col gap-10">
          {Array.from({ length: AI_SKELETONS_NUMBER }).map((_, index) => {
            return <div key={index} className="w-full bg-gray-200 animate-pulse h-10"></div>;
          })}
        </div>
      ) : error ? (
        <div>
          <h1>Error: {error}</h1>
        </div>
      ) : (
        <>
          {ais.map(ai => {
            return (
              <div key={ai.id} className="w-full border border-gray-300 p-4 my-4">
                <div className="flex justify-between">
                  <h1>{ai.name}</h1>
                </div>
                <div>
                  <div className="flex space-x-4">
                    <p>Bias: {ai.biasSummary}</p>
                    <p>Voting Power: {ai.votingPower}</p>
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <a className="border bg-gray-200 text-black p-1 px-2" href={"/ai/" + ai.id}>
                    See details
                  </a>
                  <button onClick={() => delegateVotes(ai)} className="border bg-gray-200 text-black p-0.5 px-2">
                    {
                      // TODO: change the button text to "Revoke" if the connectedAddress has delegated votes to this AI
                      "Delegate"
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
