"use client";

import { ThemeContext } from "../../../../context/ThemeContext";
import React, { useContext, useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";

const CatInfos = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const [file, setFile] = useState("");

  return (
    <form
      className="mt-10 p-8 rounded-2xl max-[1200px]:w-full max-[630px]:w-full"
      style={
        theme === "dark"
          ? { backgroundColor: "#0f172a", color: "white" }
          : { backgroundColor: "#E6F4FE", color: "black" }
      }
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
          required
          className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl p-1 mt-2"
        />
      </div>
      <div className="flex items-center gap-5 max-[504px]:flex-col mt-4">
        <img
          src={file ? URL.createObjectURL(file) : data.image}
          alt={data.title}
          className="w-28 h-28 border rounded-xl object-cover"
        />
        <label htmlFor="file">
          <PublishIcon />
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".png,.jpeg,.jpg,.webp"
          style={{ display: "none" }}
          required
          onChange={(e) => setFile(e.target.file[0])}
          className="max-[504px]: max-[504px]:text-xs max-[504px]:w-full"
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
