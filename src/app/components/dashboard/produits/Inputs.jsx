"use client";

import React, { useState } from "react";

const Inputs = () => {
  const [file, setFile] = useState("");

  return (
    <form>
      <div className="flex max-[536px]:flex-col items-center gap-5">
        <img
          src={file ? URL.createObjectURL(file) : "/products/product.svg"}
          alt="avatar"
          className="w-40 h-40 object-cover border rounded-xl"
        />
        <input
          type="file"
          id="file"
          name="file"
          accept=".png,.jpeg,.jpg,.webp"
          multiple
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="max-[536px]:pl-14 text-xs"
        />
      </div>
      <div className="grid grid-cols-2 max-[425px]:grid-cols-1 gap-6">
        {/* Input 1 */}
        <div>
          <div className="mt-10">
            <label htmlFor="" className="text-sm">
              Titre
            </label>
            <input
              type="text"
              name="title"
              placeholder="Jean skinny"
              id="title"
              required
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              // onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="fullname" className="text-sm">
              Description
            </label>
            <textarea
              type="text"
              placeholder="description... "
              name="desc"
              id="desc"
              required
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              // onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-sm">
              Catégories
            </label>
            <select
              name="category"
              id="category"
              defaultValue={"jeans"}
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              // onChange={handleCat}
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
            <select
              name="size"
              id="size"
              defaultValue={"m"}
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              // onChange={handleSize}
            >
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
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
              // onChange={handleColor}
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
                // onChange={handleChange}
                className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              
              />
            </div>
            <div className="mt-5">
              <label htmlFor="male">Stock</label>
              <input
                type="text"
                name="inStock"
                id="inStock"
                placeholder="123"
                required
                // onChange={handleChange}
                className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              />
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
