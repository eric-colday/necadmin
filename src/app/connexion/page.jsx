"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error")); 
    setSuccess(params.get("success"));
  }, [params]);

  if (status === "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (status === "authenticated") {
    router.push("/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      username,
      password,
    });
  };

  return (
    <div className="h-screen flex items-center flex-col gap-4 pt-48 pb-80">
      <h2 className="text-center text-4xl sm:text-5xl font-bold">
        Se connecter
      </h2>
      <h3 className="text-sm sm:text-xl">
        S'il vous plaît connectez-vous pour la suite
      </h3>
      <form
        className="w-[300px] flex flex-col gap-[20px]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          required
          className="p-6 bg-transparent border-2 border-gray-400 rounded-md outline-none text-zinc-500 text-xl font-bold"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          required
          className="p-6 bg-transparent border-2 border-gray-400 rounded-md outline-none text-zinc-500 text-xl font-bold"
        />
        <button className="w-74 p-5 cursor-pointer bg-sky-950  border-none rounded-md text-center text-slate-200 font-bold hover:bg-sky-900">
          Se connecter
        </button>
        {error && error} 
      </form>
    </div>
  );
};

export default page;
