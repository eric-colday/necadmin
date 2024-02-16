"use client";

import { ThemeContext } from "../context/ThemeContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { useContext } from "react";

export default function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={
        theme === "dark"
          ? { backgroundColor: "#0f172a", color: "white" }
          : { backgroundColor: "#E6F4FE", color: "black" }
      }
    >
      <div className="flex justify-center items-center gap-20 py-52 px-20 max-[768px]:flex-col-reverse">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Bienvenue sur NecAdmin</h2>
          <p>
            Ceci est le tableau de bord qui gère la boutique NecStore. Si vous
            êtez administrateur, Connectez-vous pour gérer les utilisateurs, les
            produits, etc.
          </p>
          <Link href="/connexion">
            <button className="w-44 p-5 cursor-pointer bg-sky-950  border-none rounded-md text-slate-200 font-bold hover:bg-sky-900">
              Se connecter
              <ArrowForwardIcon />
            </button>
          </Link>
        </div>
        <div
          className="
        w-11/12 h-96
        "
        >
          <img
            src="/home/dashboard.webp"
            alt="dashboard"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
