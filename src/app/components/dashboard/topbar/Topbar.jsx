"use client";

import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import React, { useContext } from "react";
import ThemeToggle from "@/app/components/themeToggle/ThemeToggle";
import PersonIcon from "@mui/icons-material/Person";

const Topbar = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className="w-full h-20 border-b sticky top-0 z-50"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="h-full px-8 flex items-center justify-between ">
        <Link href="/">
          <div className="topLeft">
            <span className="logo font-bold text-2xl text-blue-500 cursor-pointer">
              NecAdmin
            </span>
          </div>
        </Link>
        <div className="topRight flex items-center gap-4">
          <ThemeToggle />
          <Link href="/connexion">
            <PersonIcon
              className="text-3xl text-white cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
