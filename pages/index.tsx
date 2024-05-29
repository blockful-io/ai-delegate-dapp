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
    <div className="w-full pb-20">
      <h1 className="mt-20 font-black text-center my-6 text-[#F6F9F6] w-full flex text-4xl space-grotesk justify-center">
        Welcome to the DAO tooling of the Future
      </h1>
      <h2 className="mt-20 text-2xl inter">DAOs____</h2>
      <div className="w-full flex items-center flex-col mt-10">
        <DaosList />
      </div>
      <h2 className="mt-20 text-2xl inter">dApp Manifesto____</h2>
      <p className="ml-4 mt-2">
        <strong className="block mt-6">
          Exploring AI Potential in DAO Governance
        </strong>
        <p className="ml-4">
          AI Delegation is a new Blockful experiment, enabling AI Delegates to
          take part in DAO governance. With goals of streamlining
          decision-making processes and enhancing our understanding of governing
          with AI. Our Delegates are biased agents, with clearly defined and
          transparent biases, or to allowing humans to choose between different
          positions prompt their own Delegates into existence. Our research
          extends beyond automating voting.{" "}
        </p>
        <strong className="block mt-8">Governing Beyond Casting Votes</strong>
        <p className="ml-4">
          We&apos;re exploring human and AI coexistence in governance with
          agents capable of automating and assisting various governance tasks.
          By integrating AIs beyond only casting votes, we want to reduce the
          managerial burden on delegates, enabling larger voter diversity and
          better efficiency for those participating.
        </p>
        <strong className="mt-8 block">Most-likely Next Steps</strong>
        <p className="ml-4">
          This learning road will be a long one, with many improvements to be
          made to this first model. As we try to enhance the “Autonomous” part
          in DAOs, some of those improvements are quite predictable: verifiable
          AI models, permissionless integrations and resilience solutions will
          be necessary. Our decision is to prioritize public experimentation,
          learn from the results and allow for those lessons to shape what the
          next priorities will look like.
        </p>
        <strong className="mt-8 block">
          Explore and Innovate through Community
        </strong>
        <p className="ml-4">
          We want to build it in a transparent and interactive environment where
          DAO members can engage, share insights, and directly influence the
          development of AI governance tools. Community feedback will be at the
          core of how we iterate this and we welcome all AI builders and
          enthusiasts to join us in the journey. You can start by choosing and
          attributing voting power to an AI Delegate on ENS DAO Governance.
        </p>
      </p>
    </div>
  );
};

export default Home;
