import Image from "next/image";

export const SplashScreen = () => {
  return (
    <div className="flex relative w-full h-full">
      <Image
        className="fixed top-0 right-0 pointer-events-none"
        src="/GlobeIcon.png"
        alt="Globe Illustration"
        width={500}
        height={500}
      />
      <div className="mt-auto mb-40">
        <h1 className="text-2xl font-semibold space-grotesk mb-4 md:text-4xl">
          Change the game of <br /> the AIs you use.
        </h1>
        <p className="text-gray-200 inter">Connect your wallet.</p>
      </div>
    </div>
  );
};
