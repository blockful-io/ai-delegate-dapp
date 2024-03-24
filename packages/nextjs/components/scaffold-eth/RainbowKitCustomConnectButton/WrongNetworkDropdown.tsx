import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { getTargetNetworks } from "~~/utils/scaffold-eth/networks";

export const WrongNetworkDropdown = () => {
  const { chain } = useNetwork();
  const allowedNetworks = getTargetNetworks();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (chain && !allowedNetworks.find(network => network.id === chain.id)) {
      toast.error("Please connect to Scroll, Aurora, or Sepolia");
      console.log("ok");
      if (switchNetwork !== undefined) {
        switchNetwork(11155111);
      }
    }
  }, [chain]);

  return (
    <div className="dropdown dropdown-end mr-2">
      <label tabIndex={0} className="btn btn-error btn-sm dropdown-toggle gap-1 text-white">
        <span>Wrong network</span>
      </label>
    </div>
  );
};
