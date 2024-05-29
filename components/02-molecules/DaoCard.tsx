import { DAOWithProposals } from "@/lib/hooks/useDao";
import Link from "next/link";

export const DaoCard = ({ dao }: { dao: DAOWithProposals }) => {
  return (
    <Link href={`/${dao.name}`} className="rounded-lg bg-slate-600 p-6">
      {dao.name}
    </Link>
  );
};
