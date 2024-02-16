"use client";

import React, { useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";

const InputsCat = () => {
  const [file, setFile] = useState("");

  return (
    <form className="w-full ">
      <div className="mt-10">
        <label htmlFor="" className="text-sm">
          Titre
        </label>
        <input
          type="text"
          name="title"
          placeholder="Jeans"
          id="title"
          required
          className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
          // onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="" className="text-sm">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          placeholder="jeans"
          id="slug"
          required
          className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
          // onChange={handleChange}
        />
      </div>
      <div className="flex max-[536px]:flex-col items-center gap-5 mt-5">
        <img
          src={file ? URL.createObjectURL(file) : "/products/product.svg"}
          alt="avatar"
          className="w-40 h-40 border object-cover rounded-xl"
        />
        <label htmlFor="file">
          <PublishIcon className="userUpdateIcon" />
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".png,.jpeg,.jpg,.webp"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="max-[536px]:pl-14 text-xs"
        />
      </div>
      <div className="max-[425px]:text-center">
        <button className="mt-14 w-32 bg-blue-950 text-white cursor-pointer p-2 rounded-2xl text-center ">
          Créer
        </button>
      </div>
    </form>
  );
};

export default InputsCat;
