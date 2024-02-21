"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Inputs = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.id === "size" || e.target.id === "color") {
      setInfo((prev) => ({
        ...prev,
        [e.target.id]: e.target.value.split(","),
      }));
    } else {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const images = [];
  
    for (let file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");
  
      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dzer4ijr1/image/upload",
          data
        );
        images.push(uploadRes.data.url);
      } catch (err) {
        console.log(err);
      }
    }
  
    const newProduct = {
      ...info,
      image: images,
    };
  
    try {
      const res = await fetch("/api/newproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const responseData = await res.json();
      if (responseData) {
        window.location.reload();
        window.alert("Produit créé");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex max-[536px]:flex-col items-center gap-5">
        <img
          src={files.length > 0 ? URL.createObjectURL(files[0]) : "/products/product.svg"}
          alt="avatar"
          className="w-40 h-40 object-cover border rounded-xl"
        />
        <input
          type="file"
          id="file"
          name="file"
          accept=".png,.jpeg,.jpg,.webp"
          multiple
          onChange={handleFileChange}
          required
          className="max-[536px]:pl-14 text-xs"
        />
      </div>
      <div className="grid grid-cols-2 max-[425px]:grid-cols-1 gap-6">
        {/* Input 1 */}
        <div>
          <div className="mt-10">
            <label htmlFor="" className="text-sm">
              Nom du produit
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Jean skinny"
              required
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="fullname" className="text-sm">
              Description
            </label>
            <textarea
              type="text"
              placeholder="description... "
              name="description"
              id="description"
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
              id="slug"
              placeholder="jean-skinny"
              required
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-sm">
              CatSlug
            </label>
            <select
              name="catSlug"
              id="catSlug"
              defaultValue={"jeans"}
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              onChange={handleChange}
            >
              <option value="jeans">Jeans</option>
              <option value="t-shirts">T-shirts</option>
              <option value="vestes">Vestes</option>
              <option value="chaussures">Chaussures</option>
            </select>
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-sm">
              Catégories
            </label>
            <select
              name="cat"
              id="cat"
              defaultValue={"jeans"}
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              onChange={handleChange}
            >
              <option value="jeans">Jeans</option>
              <option value="t-shirts">T-shirts</option>
              <option value="vestes">Vestes</option>
              <option value="chaussures">Chaussures</option>
            </select>
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-sm">
              Taille
            </label>
            <input
              type="text"
              name="size"
              id="size"
              placeholder="XS, S, M, L, XL, XXL"
              required
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Input 2 */}
        <div className="mt-5 max-[425px]:mt-0">
          <div className="mt-5 max-[425px]:mt-0">
            <label htmlFor="" className="text-sm">
              Couleur
            </label>
            <input
              type="text"
              name="color"
              id="color"
              placeholder="white, wlack, red, blue, yellow, green"
              required
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              onChange={handleChange}
            />
          </div>
          <div className="mt-12 max-[425px]:mt-5">
            <label htmlFor="" className="text-sm">
              Prix
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="price"
                id="price"
                placeholder="100"
                required
                onChange={handleChange}
                className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="male">En Stock</label>
              <select
                name="inStock"
                id="inStock"
                className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
                onChange={handleChange}
              >
                <option value="true" on="true">
                  Oui
                </option>
                <option value="false" on="false">
                  Non
                </option>
              </select>
            </div>
            <div className="max-[425px]:text-center">
              <button className="mt-14 w-32 bg-blue-950 text-white cursor-pointer p-2 rounded-2xl text-center ">
                Créer
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Inputs;
