import { useState } from "react";
import { signOut } from "next-auth/react";
import { useAccount, useEnsName } from "wagmi";
import { XIcon } from "../01-atoms";

export const UserDropdown = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex space-x-3 relative">
      <div className="h-6 w-6 bg-gradient-avatar rounded-full" />
      <button
        onClick={toggleModal}
        className="truncate max-w-[120px] font-semibold"
      >
        {ensName ? ensName : address?.slice(0, 6) + "..." + address?.slice(-4)}
      </button>
      {isModalOpen && (
        <div className="z-50 flex flex-col space-y-3 p-2 min-w-[180px] rounded-xl items-end justify-center bg-[#2d2c2c] absolute top-[36px] right-0">
          <button onClick={toggleModal} className="cursor-pointer">
            <XIcon className="w-4 mr-1" />
          </button>
          <button
            className="bg-black text-[#B2FF72] rounded-full px-3 py-1 font-semibold cursor-pointer hover:text-[#81dd37] transition"
            onClick={() => signOut()}
          >
            Disconnect wallet
          </button>
        </div>
      )}
    </div>
  );
};
