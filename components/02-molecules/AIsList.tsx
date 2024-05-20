import { AIDelegateCard } from "../01-atoms";
import { SummarizedAI } from "../../lib/hooks/useDelegates";

interface AIListProps {
  delegates: SummarizedAI[];
}

export const AIsList = ({ delegates }: AIListProps) => {
  return (
    <div className="w-full flex flex-col gap-3 md:justify-center md:items-center">
      {delegates.map((d) => {
        return (
          <div key={d.id}>
            <AIDelegateCard delegate={d} />
          </div>
        );
      })}
    </div>
  );
};
