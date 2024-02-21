"use client";

import { useRouter } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

const CatInfos = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const [update, setUpdate] = useState({});
  const categoryId = data._id;
  const router = useRouter();

  useEffect(
    () => () => {
      setUpdate({});
    },
    [data]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateUser = {
      ...update,
    };

    try {
      const res = await fetch("/api/categoryproducts/" + categoryId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUser),
      });
      const responseData = await res.json();
      if (responseData) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setUpdate((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <form
      className="mt-10 p-8 rounded-2xl max-[1200px]:w-full max-[630px]:w-full"
      style={
        theme === "dark"
          ? { backgroundColor: "#0f172a", color: "white" }
          : { backgroundColor: "#E6F4FE", color: "black" }
      }
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="" className="text-sm"> 
          Titre
        </label> 
        <input
          type="text"
          id="title"
          name="title"
          placeholder={data.title}
          defaultValue={data.title} 
          required
          className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl p-1 mt-2"
        />
      </div>
      <div className="mt-2">
        <label htmlFor="" className="text-sm">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          placeholder={data.slug}
          defaultValue={data.slug}
          onChange={handleChange}
          required
          className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl p-1 mt-2"
        />
      </div>
      <div className="max-[504px]:text-center">
        <button className="w-32 mt-4 bg-blue-950 text-white cursor-pointer p-2 rounded-2xl text-center">
          Mettre à jour
        </button>
      </div>
    </form>
  );
};

export default CatInfos;
