import useDao, { DAOWithProposals } from "@/lib/hooks/useDao";
import { useEffect, useState } from "react";
import { DefaultErrorMessage } from "../01-atoms";
import Link from "next/link";

const DAO_SKELETONS_NUMBER = 1;

export const DaosList = () => {
  const { fetchDaos } = useDao();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [daos, setDaos] = useState<DAOWithProposals[] | null>(null);

  useEffect(() => {
    fetchDaos()
      .then((daos) => {
        setDaos(daos);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        {Array.from({ length: DAO_SKELETONS_NUMBER }).map((_, index) => {
          return (
            <div
              key={index}
              className="w-[100px] h-[40px] rounded-lg  bg-gray-200 animate-pulse"
            ></div>
          );
        })}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-10">
        <DefaultErrorMessage />
      </div>
    );
  }
  return (
    <ul className="flex space-x-3 space-y-3 items-center justify-center">
      {daos?.map((dao) => (
        <li key={dao.id}>
          <Link href={`/dao/${dao?.id}/delegates`}>
            <h1 className="bg-[#4A6A30] hover:bg-[#618246] transition font-black w-[100px] h-[40px] rounded-lg flex items-center justify-center">
              {dao?.name}
            </h1>
          </Link>
        </li>
      ))}
    </ul>
  );
};
