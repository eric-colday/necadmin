"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";
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
      await fetch("/api/posts/" + _id, {
        method: "DELETE",
      });
      setList(list.filter((post) => post._id !== _id));
      window.location.reload();
      Router.push("/dashboard/products");
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
          <td className="border-b pl-4">Nom</td>
          <td className="border-b pl-4 max-[910px]:hidden">Catégorie</td>
          <td className="border-b pl-4 max-[421px]:hidden">Auteur</td>
          <td className="border-b pl-4 max-[1115px]:hidden">Date</td>
          <td className="border-b pl-4">Action</td>
        </tr>
      </thead>
      <tbody>
        {data.map((post) => (
          <tr className="h-14" key={post.id}>
            <td className="border-b pl-4 py-4 flex items-center gap-2">
              {post.title.length > 10
                ? post.title.slice(0, 10) + "..."
                : post.title}
            </td>
            <td className="border-b pl-4 max-[910px]:hidden">{post.cat}</td>
            <td className="border-b pl-4 max-[421px]:hidden capitalize">{post.fullname}</td>
            <td className="border-b pl-4 max-[1115px]:hidden">
              {format(post.createdAt, "fr_FR")}
            </td>
            <td className="border-b pl-4">
              <Link href={`/dashboard/update/${post._id}`}>
                <EditIcon className="text-green-500 mr-10 cursor-pointer" />
              </Link>
              <DeleteOutlineIcon
                className="text-red-400 cursor-pointer"
                onClick={() => openModal(post._id)}
              />
              {modal === post._id ? (
                <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div
                    className=" p-4 w-96 h-48 flex flex-col justify-center items-center rounded-2xl"
                    style={
                      theme === "dark"
                        ? { backgroundColor: "#0f172a", color: "white" }
                        : { backgroundColor: "#E6F4FE", color: "black" }
                    }
                  >
                    <h1 className="text-xl font-bold mb-4">{post.title}</h1>
                    <p className="text-center">
                      Voulez-vous vraiment supprimer cet article ?
                    </p>
                    <div className="flex gap-4 mt-4">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-2xl"
                        onClick={() => handleDelete(post._id)}
                      >
                        Oui
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-2xl"
                        onClick={() => setModal(false)}
                      >
                        Non
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </td>
          </tr>
        ))}
        <tr className=" h-20"></tr>
      </tbody>
    </table>
  );
};

export default Table;
