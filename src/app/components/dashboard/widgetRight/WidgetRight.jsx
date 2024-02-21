"use client";

import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import React, { useContext } from "react";
import { format } from "timeago.js";
import { Orders } from "@/data";
import { notFound } from "next/navigation";

const getData = () => {
  const data = Orders;

  if (data) {
    return data;
  }

  return notFound();
};

const WidgetRight = () => {
  const { theme } = useContext(ThemeContext);
  const data = getData();

  return (
    <div
      className="flex flex-col content-center gap-4 w-full h-96 px-10 max-[425px]:px-5 pt-12 max-[430px]:pl-20 shadow offset-x-0 offset-y-0 blur-15 opacity-75"
      style={
        theme === "dark"
          ? { backgroundColor: "#0f172a", color: "white" }
          : { backgroundColor: "#E6F4FE", color: "black" }
      }
    >
      <h2 className="text-2xl max-[425px]:text-xl">Dernières transactions</h2>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 items-center gap-16 max-[973px]:gap-0 max-[540px]:grid-cols-3">
          <span>Client ID</span>
          <span className="max-[540px]:hidden">Date</span>
          <span>Montant</span>
          <span>Statut</span>
        </div>
        <div className="flex flex-col gap-10 ">
          {data.slice(Math.max(data.length - 4, 0)).map((item) => (
            <Link
              // href="/orders/[id]" as={`/orders/${item.id}`} key={item.id}
              href="/dashboard/commandes"
            >
              <div
                className="grid grid-cols-4 items-center gap-16 max-[973px]:gap-0 text-sm max-[540px]:grid-cols-3"
                key={item.id}
              >
                <span>{item.id.slice(Math.max(item.id.length - 8, 0))} </span>
                <span className="max-[540px]:hidden">
                  {format(item.createdAt, "fr_FR")}
                </span>
                <span>
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(item.amount)}{" "}
                </span>
                <div
                  className={
                    item.status === "en attente"
                      ? "bg-red-400 rounded-2xl text-center"
                      : "bg-lime-500 rounded-2xl text-center"
                  }
                >
                  {<span>{item.status}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetRight;
