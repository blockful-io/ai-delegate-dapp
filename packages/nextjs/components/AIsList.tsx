import DelegateButton from "./DelegateButton";
import RevokeButton from "./RevokeButton";
import { AI } from "~~/services/ai";

interface AIListProps {
  delegates: AI[];
  delegated: boolean;
}

export const AIsList = ({ delegates, delegated }: AIListProps) => {
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
                <a className="border bg-gray-200 text-black p-1 px-2" href={`/delegates/${d.id}`}>
                  See details
                </a>
                {delegated ? <RevokeButton id={d.id} /> : <DelegateButton id={d.id} />}
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};
