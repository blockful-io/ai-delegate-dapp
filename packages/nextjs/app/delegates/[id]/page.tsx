"use client";

import { CardDelegate } from "~~/components/01-atoms/CardDelegate";
import { ActiveTab, Footer } from "~~/components/Footer";
import { Header, HeaderVariant } from "~~/components/Header";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  return (
    <div className="w-full">
      <Header variant={HeaderVariant.DEFAULT} />
      <div className="w-full flex items-center flex-col ">
        <h1 className="my-5 text-[#F6F9F6] w-full flex">Delegate to biased AI</h1>
        <CardDelegate params={{ id: params.id }} />
      </div>
      <Footer tab={ActiveTab.DELEGATE} />
    </div>
  );
}
