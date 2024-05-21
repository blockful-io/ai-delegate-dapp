import type { NextPage } from "next";
import { PageTab, PageTabs } from "@/components/02-molecules";
import { ProposalsList } from "@/components/03-organisms";

const Proposals: NextPage = () => {
  return (
    <div className="w-full">
      <PageTabs activeTab={PageTab.PROPOSAL} />
      <div className="w-full flex items-start flex-col">
        <ProposalsList />
      </div>
    </div>
  );
};

export default Proposals;
