"use client";

import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";
import { format } from "timeago.js";

const Table = ({ data, page }) => {
  const { theme } = useContext(ThemeContext);
  const [orders, setOrders] = useState(data);

  const handleDelete = (slug) => {
    const newData = orders.filter((item) => item.slug !== slug);
    setOrders(newData);
  };

  return (
    <table
      className="mt-14 w-full"
      style={
        theme === "dark"
          ? { backgroundColor: "#0f172a", color: "white" }
          : { backgroundColor: "#E6F4FE", color: "black" }
      }
    >
      <thead>
        <tr className="h-20">
          <td className="border-b pl-4">ID</td>
          <td className="border-b pl-4 max-[910px]:hidden">Montant</td>
          <td className="border-b pl-4 max-[910px]:hidden">
            Nombre de produits
          </td>
          <td className="border-b pl-4 max-[421px]:hidden">Statut</td>
          <td className="border-b pl-4 max-[1115px]:hidden">Date</td>
          <td className="border-b pl-4">Action</td>
        </tr>
      </thead>
      <tbody>
        {data.slice((page - 1) * 4, (page - 1) * 4 + 4).map((order) => (
          <tr className="h-14" key={order.id}>
            <td className="border-b pl-4 py-4 flex items-center gap-2">
              {order.id}
            </td>
            <td className="border-b pl-4 max-[910px]:hidden">
              {order.amount}€
            </td>
            <td className="group/item border-b pl-4 cursor-pointer max-[910px]:hidden">
              {order.products.reduce((acc, item) => acc + item.quantity, 0)}{" "}
              produits
              <div className="absolute z-50 bg-white text-blue-950 group/edit invisible hover:bg-slate-200 group-hover/item:visible ">
                {
                  <div className="flex flex-col gap-2 p-2">
                    {order.products.map((item) => (
                      <div className="flex justify-between gap-5">
                        <p>{item.title}</p>
                        <p>{item.price}€</p>
                      </div>
                    ))}
                  </div>
                }
              </div>
            </td>
            <td
              className="border-b pl-4 max-[421px]:hidden"
              style={
                order.status === "terminé"
                  ? { color: "#21c55d" }
                  : { color: "#f77171" }
              }
            >
              {order.status === "terminé" ? "Payée" : "En attente"}
            </td>
            <td className="border-b pl-4 max-[1115px]:hidden">
              {format(order.createdAt, "fr_FR")}
            </td>
            <td className="border-b pl-4">
              <select
                name="status"
                id="status"
                className="bg-transparent border-none outline-none pr-4"
                defaultValue={order.status}
              >
                <option value="en attente">En attente</option>
                <option value="terminé">Terminé</option>
              </select>
              <DeleteOutlineIcon
                className="text-red-400 cursor-pointer"
                onClick={() => handleDelete(order.slug)}
              />
            </td>
          </tr>
        ))}
        <tr className=" h-20"></tr>
      </tbody>
    </table>
  );
};

export default Table;
