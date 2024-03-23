import { useEffect } from "react";
import toast from "react-hot-toast";

export const WrongNetworkDropdown = () => {
  useEffect(() => {
    toast.error("please connect to scrooll, aurora or sepolia");
  }, []);
  return (
    <div className="dropdown dropdown-end mr-2">
      <label tabIndex={0} className="btn btn-error btn-sm dropdown-toggle gap-1 text-white">
        <span>Wrong network</span>
      </label>
    </div>
  );
};
