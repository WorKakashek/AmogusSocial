"use client";
import React from "react";
import { sidebarLinks } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const LeftBar = ({ className }: any) => {
  const pathname = usePathname();
  const { data, status } = useSession();
  let auth: boolean;
  if (status === "authenticated") {
    auth = true;
  } else {
    auth = false;
  }
  return (
    <div className={className}>
      <ul className="px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <li key={link.id} className="">
              <Link
                href={link.route}
                className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                  isActive && "bg-slate-800"
                } hover:bg-purple-500 transition-all duration-200 ease-in-out`}
              >
                <Image
                  alt={link.label}
                  src={link.imgURL}
                  width={28}
                  height={28}
                />
                <p>{link.label}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      {auth ? (
        <button
          className=" font-bold hover:bg-purple-500 transition-colors duration-200 ease-out rounded-lg"
          onClick={() => signOut()}
        >
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default LeftBar;
