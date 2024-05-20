import type { NextPage } from "next";
import { PageTab, PageTabs } from "@/components/02-molecules";
import { DelegatesList } from "@/components/03-organisms/DelegatesList";
import { SplashScreen } from "@/components/04-templates";
import { useUser } from "@/lib/hooks/useUser";

const Home: NextPage = () => {
  const { authedUser } = useUser();

  if (!authedUser) {
    return <SplashScreen />;
  }

  return (
    <div className="w-full">
      <PageTabs activeTab={PageTab.DELEGATES} />
      <div className="w-full flex items-start flex-col">
        <DelegatesList />
      </div>
    </div>
  );
};

export default Home;
