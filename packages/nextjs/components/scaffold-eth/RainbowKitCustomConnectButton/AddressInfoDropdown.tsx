import { getAddress } from "viem";
import { Address } from "wagmi";
import { BlockieAvatar, isENS } from "~~/components/scaffold-eth";

type AddressInfoDropdownProps = {
  address: Address;
  blockExplorerAddressLink: string | undefined;
  displayName: string;
  ensAvatar?: string;
};

export const AddressInfoDropdown = ({ address, ensAvatar, displayName }: AddressInfoDropdownProps) => {
  const checkSumAddress = getAddress(address);

  return (
    <div className="w-full flex">
      <BlockieAvatar address={checkSumAddress} size={30} ensImage={ensAvatar} />
      <p className="ml-2 mr-1 text-[#F6F9F6]">
        {isENS(displayName) ? displayName : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
      </p>
    </div>
  );
};
