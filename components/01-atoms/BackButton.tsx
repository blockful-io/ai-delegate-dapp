import { ArrowIcon } from "./icons/ArrowIcon";
import { useRouter } from "next/router";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center space-x-3 mt-10 text-sm font-bold text-[#B1FF6F]"
    >
      <div className="transform rotate-180 mr-2">
        <ArrowIcon fill="#B1FF6F" className="w-4 h-4" />
      </div>
      Back
    </button>
  );
};
