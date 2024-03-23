"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StormIcon } from "./01-atoms";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Proposals",
    href: "/",
  },
  {
    label: "Delegate",
    href: "/delegate",
  },
  {
    label: "New AI Profile",
    href: "/create-ai",
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary sm:px-2 px-[24px] py-5">
      <div className="flex justify-between w-full">
        <StormIcon />
        <RainbowKitCustomConnectButton />
      </div>
      {/* <FaucetButton /> */}
    </div>
  );
};
