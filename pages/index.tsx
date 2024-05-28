import type { NextPage } from "next";
import { SplashScreen } from "@/components/04-templates";
import { DaosList } from "@/components/03-organisms";
import { useUser } from "@/lib/hooks/useUser";

const Home: NextPage = () => {
  const { authedUser } = useUser();

  if (!authedUser) {
    return <SplashScreen />;
  }

  return (
    <div className="w-full">
      <h1 className="mt-32 font-semibold text-center my-6 text-[#F6F9F6] w-full flex text-2xl space-grotesk justify-center">
        Welcome to the DAO tooling <br /> of the Future
      </h1>
      <div className="w-full flex items-center flex-col mt-10">
        <DaosList />
      </div>
    </div>
  );
};

export default Home;
