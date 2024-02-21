"use client";

import React, { useContext } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ThemeContext } from "@/context/ThemeContext";

const FeaturedInfo = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="grid grid-cols-3 max-[920px]:grid-cols-2 max-[818px]:grid-cols-3 max-[607px]:grid-cols-2 max-[431px]:grid-cols-1 gap-5 ">
      <div
        className="flex flex-col content-center gap-2 w-full h-52 px-5 pt-12 max-[430px]:pl-20 rounded-3xl shadow offset-x-0 offset-y-0 blur-15 opacity-75"
        style={
          theme === "dark"
            ? { backgroundColor: "#0f172a", color: "white" }
            : { backgroundColor: "#E6F4FE", color: "black" }
        }
      >
        <span className="text-2xl">Utilisateurs</span>
        <div className="flex items-center gap-3 ">
          <span className="text-xl font-bold">2,000</span>
          <span className="">
            %2.7
            <ArrowDownwardIcon className="text-red-600 negative" />
          </span>
        </div>
        <span className="text-slate-400">Par rapport au mois dernier</span>
      </div>
      <div
        className="flex flex-col gap-2 w-full h-52 px-5 pt-12 max-[430px]:pl-20 rounded-3xl shadow offset-x-0 offset-y-0 blur-15 opacity-75"
        style={
          theme === "dark"
            ? { backgroundColor: "#0f172a", color: "white" }
            : { backgroundColor: "#E6F4FE", color: "black" }
        }
      >
        <span className="text-2xl">Commandes</span>
        <div className="flex items-center gap-3 ">
          <span className="text-xl font-bold">450</span>
          <span className="">
            -1.4
            <ArrowDownwardIcon className="text-red-600 negative" />
          </span>
        </div>
        <span className="text-slate-400">Par rapport au mois dernier</span>
      </div>
      <div
        className="flex flex-col content-center gap-2 w-full h-52 px-5 pt-12 max-[430px]:pl-20 rounded-3xl shadow offset-x-0 offset-y-0 blur-15 opacity-75"
        style={
          theme === "dark"
            ? { backgroundColor: "#0f172a", color: "white" }
            : { backgroundColor: "#E6F4FE", color: "black" }
        }
      >
        <span className="text-2xl">Revenus</span>
        <div className="flex items-center gap-3 ">
          <span className="text-xl font-bold">2,225€</span>
          <span className="">
            +2.4
            <ArrowUpwardIcon className="text-green-700  negative" />
          </span>
        </div>
        <span className="text-slate-400">Par rapport au mois dernier</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
