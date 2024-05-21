import type { NextPage } from "next";
import { PageTab, PageTabs } from "@/components/02-molecules";
import { DelegatesList } from "@/components/03-organisms";

const Delegates: NextPage = () => {
  return (
    <div className="w-full">
      <PageTabs activeTab={PageTab.DELEGATES} />
      <div className="w-full flex items-start flex-col">
        <DelegatesList />
      </div>
    </div>
  );
};

export default Delegates;
