"use client";

import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";

const TableCat = ({ data, page }) => {
    const { theme } = useContext(ThemeContext);
    const [cat, setCat] = useState(data);
  
    const handleDelete = (slug) => {
      const newData = cat.filter((item) => item.slug !== slug);
      setCat(newData);
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
          <td className="border-b pl-4">Titre</td>
          <td className="border-b pl-4 max-[486px]:hidden">Slug</td>
          <td className="border-b pl-4">Action</td>
        </tr>
      </thead>
      <tbody>
        {data.slice((page - 1) * 4, (page - 1) * 4 + 4).map((item) => (
          <tr className="h-14" key={item.id}>
            <td className="border-b pl-4 max-[910px]:hidden">
              {item.id.length > 2 ? item.id.slice(0, 2) + "..." : item.id}
            </td>
            <td className="border-b pl-4 py-4 flex items-center gap-2">
              {item.title}
            </td>
            <td className="border-b pl-4 max-[486px]:hidden">{item.slug}</td>
            <td className="border-b pl-4">
              <Link href={`/dashboard/articles/categories/${item.slug}`}>
                <EditIcon className="text-green-500 mr-10 cursor-pointer" />
              </Link>
              <DeleteOutlineIcon
                className="text-red-400 cursor-pointer"
                onClick={() => handleDelete(item.slug)}
              />
            </td>
          </tr>
        ))}
        <tr className=" h-20"></tr>
      </tbody>
    </table>
  )
}

export default TableCat
