import { DAO } from "@/lib/hooks/useDao";
import Link from "next/link";

export const DaoCard = ({ dao }: { dao: DAO }) => {
  return (
    <Link href={`/${dao.daoName}`} className="rounded-lg bg-slate-600 p-6">
      {dao.daoName}
    </Link>
  );
};
