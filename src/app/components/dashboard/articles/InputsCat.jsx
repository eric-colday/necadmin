"use client";

import React, { useState } from "react";

const InputsCat = () => {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPost = {
        ...info,
      };

      const res = await fetch("/api/newcategorypost", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const responseData = await res.json();
      if (responseData) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err); 
    }
  };

  return (
    <form className="w-full "
      onSubmit={handleSubmit}
    >
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
          onChange={handleChange}
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
          onChange={handleChange}
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
