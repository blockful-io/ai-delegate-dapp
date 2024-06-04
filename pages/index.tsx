import type { NextPage } from "next";
import { SplashScreen } from "@/components/04-templates";
import { DaosList } from "@/components/03-organisms";
import { useUser } from "@/lib/hooks/useUser";
import { ArrowIcon } from "@/components/01-atoms";
import Link from "next/link";

const Home: NextPage = () => {
  const { authedUser } = useUser();

  if (!authedUser) {
    return <SplashScreen />;
  }

  return (
    <div className="w-full pb-20">
      <h1 className="mt-20 font-black text-center my-6 text-[#F6F9F6] w-full flex text-4xl space-grotesk justify-center">
        Welcome to the DAO tooling of the Future
      </h1>
      <h2 className="pointer-events-none mt-20 text-2xl inter flex items-center space-x-2">
        <ArrowIcon />
        <p>DAOs</p>
      </h2>
      <div className="w-full flex items-center flex-col mt-10">
        <DaosList />
      </div>
      <Link
        href="/manifesto"
        className="hover:underline cursor-pointer mt-20 text-2xl inter flex space-x-2 items-center"
      >
        <ArrowIcon />
        <p>dApp Manifesto</p>
      </Link>
    </div>
  );
};

export default Home;
