"use client";

import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";
import { format } from "timeago.js";

const Table = ({ data, page }) => {
  const { theme } = useContext(ThemeContext);
  const [users, setUsers] = useState(data);

  const handleDelete = (slug) => {
    const newData = users.filter((item) => item.slug !== slug);
    setUsers(newData);
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
        {data.slice((page - 1) * 4, (page - 1) * 4 + 4).map((post) => (
          <tr className="h-14" key={post.id}>
            <td className="border-b pl-4 py-4 flex items-center gap-2">
              {post.title.length > 10
                ? post.title.slice(0, 10) + "..."
                : post.title}
            </td>
            <td className="border-b pl-4 max-[910px]:hidden">{post.cat}</td>
            <td className="border-b pl-4 max-[421px]:hidden">{post.author}</td>
            <td className="border-b pl-4 max-[1115px]:hidden">
              {format(post.createdAt, "fr_FR")}
            </td>
            <td className="border-b pl-4">
              <Link href={`/dashboard/update/${post.slug}`}>
                <EditIcon className="text-green-500 mr-10 cursor-pointer" />
              </Link>
              <DeleteOutlineIcon
                className="text-red-400 cursor-pointer"
                onClick={() => handleDelete(post.slug)}
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
