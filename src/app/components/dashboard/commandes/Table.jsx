"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "timeago.js";

const Table = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const [list, setList] = useState();

  const [modal, setModal] = useState(null);

  const openModal = (id) => {
    setModal(id);
  };

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (_id) => {
    try {
      await fetch("/api/orders/" + _id, {
        method: "DELETE",
      });
      setList(list.filter((order) => order._id !== _id));
      window.location.reload();
      Router.push("/dashboard/commandes");
    } catch (err) {
      console.log(err);
    }
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
          <td className="border-b pl-4 max-[910px]:hidden">ID</td>
          <td className="border-b pl-4">Email</td>
          <td className="border-b pl-4 ">Montant</td>
          <td className="border-b pl-4 max-[910px]:hidden">
            Nombre de produits
          </td>
          <td className="border-b pl-4 max-[421px]:hidden">Statut</td>
          <td className="border-b pl-4 max-[1115px]:hidden">Date</td>
          <td className="border-b pl-4">Action</td>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr className="h-14" key={order.id}>
            <td className="border-b pl-4 py-4 flex items-center gap-2 max-[910px]:hidden">
              {order._id.length > 5 ? order._id.slice(0, 5) + "..." : order._id}
            </td>
            <td className="border-b pl-4">{order.userEmail}</td>
            <td className="border-b pl-4 ">{order.amount}€</td>
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
                order.status === "Payé!"
                  ? { color: "#21c55d" }
                  : { color: "#f77171" }
              }
            >
              {order.status}
            </td>
            <td className="border-b pl-4 max-[1115px]:hidden">
              {format(order.createdAt, "fr_FR")}
            </td>
            <td className="border-b pl-4">
              <form
                action=""
                className="flex gap-2"
              >
                <select
                  name="action"
                  id="action"
                  // onChange={handleChange}
                  className="w-24 border outline-none border-gray-300 text-sky-950 rounded-xl p-2"
                >
                  <option value="true">En cours</option>
                  <option value="false">Livré</option>
                </select>
                <button>
                  <EditIcon name="edit" className="cursor-pointer" />
                </button>
              </form>
            </td>
          </tr>
        ))}
        <tr className=" h-20"></tr>
      </tbody>
    </table>
  );
};

export default Table;
