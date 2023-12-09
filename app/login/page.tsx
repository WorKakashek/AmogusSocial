"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const { data, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div>
      <button onClick={() => signIn("google")}>SignIn with Google</button>
    </div>
  );
};

export default Login;
