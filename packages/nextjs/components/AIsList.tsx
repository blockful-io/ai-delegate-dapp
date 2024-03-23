import { AI } from "~~/services/ai/getAIs";

interface AIListProps {
  delegates: AI[];
  delegated: boolean;
  onRevoke: (id: string) => void;
  onDelegate: (id: string) => void;
}

export const AIsList = ({ delegates, onDelegate, delegated, onRevoke }: AIListProps) => {
  return (
    <div className="w-full">
      <>
        {delegates.map(d => {
          return (
            <div key={d.id} className="w-full border border-gray-300 p-4 my-4">
              <div className="flex justify-between">
                <h1>{d.name}</h1>
              </div>
              <div>
                <div className="flex space-x-4">
                  <p>Bias: {d.biasSummary}</p>
                  <p>Voting Power: {d.votingPower}</p>
                </div>
              </div>
              <div className="w-full flex justify-between">
                <a className="border bg-gray-200 text-black p-1 px-2" href={`/dele/${d.id}`}>
                  See details
                </a>
                {delegated ? (
                  <button onClick={() => onRevoke(d.id)} className="border bg-gray-200 text-black p-0.5 px-2">
                    Revoke
                  </button>
                ) : (
                  <button onClick={() => onDelegate(d.id)} className="border bg-gray-200 text-black p-0.5 px-2">
                    Delegate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};
