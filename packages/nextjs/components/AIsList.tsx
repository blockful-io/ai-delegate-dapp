import { useRouter } from "next/navigation";
import { HandIcon } from "./01-atoms/HandIcon";
import { InfoIcon } from "./01-atoms/InfoIcon";
import { AI } from "~~/services/ai";

interface AIListProps {
  delegates: AI[];
}

export const AIsList = ({ delegates }: AIListProps) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-3">
      <>
        {delegates.map(d => {
          return (
            <div
              key={d.id}
              className=" border border-gray-300 p-4 text-white bg-[#F6F9F6] max-w-[382px] max-h-[168px] rounded-xl"
            >
              <div className="flex flex-col gap-4">
                <div className="text-black flex">
                  {d.name}
                  {/* <AddressWalletIcon address={connectedAddress} /> */}
                </div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-9 h-9 border rounded-[100px] flex justify-center items-center bg-[#9192951F]">
                    <InfoIcon />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#323439] text-sm font-medium leading-[16.80px]">{d.name}</div>
                    <div className="text-[#323439] text-sm">{d.biasSummary}</div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div className="w-9 h-9 border rounded-[100px] flex justify-center items-center bg-[#9192951F]">
                    <HandIcon />
                  </div>

                  <div className="flex flex-col">
                    <div className="text-[#323439] text-sm font-medium leading-[16.80px]">Voting Power</div>
                    <div className="text-[#323439] text-sm">{d.votingPower}</div>
                  </div>
                </div>
              </div>

              <div className="text-black flex pt-4 justify-between">
                <div className="gap-2 flex ">
                  <button
                    className="px-3 py-2 bg-[#9192951F] text-sm rounded-[100px]"
                    onClick={() => router.push(`/delegates/${d.id}`)}
                  >
                    See details
                  </button>
                  <button className="px-3 py-2 bg-[#9192951F] text-sm rounded-[100px]">See txn</button>
                </div>
                <div>
                  <button className="bg-[#B1FF6F] text-[#17181C] rounded-[100px] text-sm font-normal px-3 py-2">
                    Delegate
                  </button>
                </div>
              </div>

              {/* <div className="w-full flex justify-between">
                <a className="border bg-gray-200 text-black p-1 px-2" href={`/delegates/${d.id}`}>
                  See details
                </a>
                {delegated ? <RevokeButton id={d.id} /> : <DelegateButton id={d.id} />}
              </div> */}
            </div>
          );
        })}
      </>
    </div>
  );
};
