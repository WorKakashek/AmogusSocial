"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ProfileHomeMenu = () => {
  const { data, status } = useSession();
  const pathname = usePathname();
  if (status === "unauthenticated") {
    return (
      <Link href={"/login"} className=" font-bold ">
        Login
      </Link>
    );
  }
  if (status === "authenticated") {
    return (
      <div className="flex space-x-4 items-center">
        <Image
          alt="Avatar"
          src={data.user?.image || ""}
          width={36}
          height={36}
          className=" rounded-full"
        />
        <p className=" font-bold">{data.user?.name}</p>
      </div>
    );
  }
};

export default ProfileHomeMenu;
