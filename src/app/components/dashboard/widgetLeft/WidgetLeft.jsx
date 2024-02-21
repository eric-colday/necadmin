"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { Users } from "@/data";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useContext } from "react";

const getData = () => {
  const data = Users;

  if (data) {
    return data;
  }

  return notFound();
};

const WidgetLeft = () => {
  const { theme } = useContext(ThemeContext);
  const data = getData();

  return (
    <div
      className="flex flex-col content-center gap-4 w-2/4 max-[1339px]:w-full h-96 px-10 max-[430px]:px-4 pt-12 max-[430px]:pl-12 shadow offset-x-0 offset-y-0 blur-15 opacity-75"
      style={
        theme === "dark"
          ? { backgroundColor: "#0f172a", color: "white" }
          : { backgroundColor: "#E6F4FE", color: "black" }
      }
    >
      <h2 className="text-2xl max-[425px]:text-xl">Nouveaux membres</h2>
      <div className="flex flex-col gap-5">
        {data.slice(Math.max(data.length - 4, 0)).map((user) => (
          <div
            className="grid grid-cols-3 max-[375px]:grid-cols-2 items-center "
            key={user.id}
          >
            <img
              src={user.img}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="max-[375px]:hidden">{user.name} </span>
            <Link href={`/dashboard/utilisateurs/${user.slug}`}>
              <button className="flex justify-center items-center gap-2 bg-white rounded-2xl w-20 h-8 text-slate-900">
                <VisibilityIcon className="widgetSmIcon" />
                Voir
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetLeft;
