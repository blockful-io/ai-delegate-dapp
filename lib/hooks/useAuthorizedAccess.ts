/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUser } from "./useUser";
import { useRouter } from "next/navigation";

export const useAuthorizedAccess = () => {
  const { authedUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!authedUser) {
      router.push("/");
    }
  }, [authedUser]);
};
