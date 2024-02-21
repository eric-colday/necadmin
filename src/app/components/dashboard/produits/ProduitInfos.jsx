"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import PublishIcon from "@mui/icons-material/Publish";
import { productData } from "@/data";
import Chart from "./Chart";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProduitInfos = ({ product }) => {
  const { theme } = useContext(ThemeContext);
  const [files, setFiles] = useState("");
  const [update, setUpdate] = useState({});
  const router = useRouter();
  const productId = product._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialisez imageUrl comme un tableau vide
    let imageUrl = [];

    // Si un nouveau fichier a été sélectionné, téléchargez-le et mettez à jour l'URL de l'image
    if (files.length > 0) {
      for (let file of files) {
        const data = new FormData(); 
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dzer4ijr1/image/upload",
            data
          );
          // Ajoutez l'URL de l'image téléchargée au tableau imageUrl
          imageUrl.push(uploadRes.data.url);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      // Si aucun nouveau fichier n'a été sélectionné, utilisez l'image actuelle
      imageUrl = product.image;
    }

    // Mettez à jour le produit avec la nouvelle URL de l'image (ou l'ancienne si aucune nouvelle image n'a été téléchargée)
    const updateProduct = {
      ...update,
      image: imageUrl,
    };

    try {
      const res = await fetch("/api/products/" + productId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateProduct),
      });
      const responseData = await res.json();
      if (responseData) {
        window.location.reload();
        window.alert("Produit mis à jour");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    () => () => {
      setFiles("");
      setUpdate({});
    },
    [product]
  );

  const handleChange = (e) => {
    if (e.target.id === "size" || e.target.id === "color") {
      setUpdate((prev) => ({
        ...prev,
        [e.target.id]: e.target.value.split(","),
      }));
    } else {
      setUpdate((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  return (
    <div className="flex gap-4 w-full max-[1200px]:flex-col max-[818px]:flex-row max-[630px]:flex-col ">
      {/* DIV 1 */}
      <div
        className="mt-10 p-8 rounded-2xl w-2/3 max-[1200px]:w-full max-[818px]:w-1/2 max-[630px]:w-full"
        style={
          theme === "dark"
            ? { backgroundColor: "#0f172a", color: "white" }
            : { backgroundColor: "#E6F4FE", color: "black" }
        }
      >
        <div className="flex items-center gap-5">
          <img
            src={product.image[0]}
            alt="avatar"
            className="w-10 h-10 object-cover border rounded-full"
          />
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <h2 className="font-bold">Détails du produit</h2>
          <div className="flex flex-col gap-2">
            <span>id : {product._id}</span>
            <span>Nom : {product.title}</span>
            <span>
              Description :{" "}
              {product.description.length > 50
                ? product.description.slice(0, 50) + "..."
                : product.description}
            </span>
            <span>Prix : {product.price} €</span>
            <span>Categorie : {product.cat}</span>
            <span>
              Tailles :{" "}
              {product.size.map((s) => (
                <span>{s}, </span>
              ))}
            </span>
            <span>
              Couleurs :{" "}
              {product.color.map((c) => (
                <span>{c}, </span>
              ))}
            </span>
            <span>Ventes : 200</span>
            <span>Stock : {product.inStock ? "En stock" : "En rupture"}</span>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <h2 className="font-bold">Performance de ventes</h2>
          <div className="flex items-center gap-2">
            <Chart data={productData} />
          </div>
        </div>
      </div>
      {/* DIV 2 */}
      <div
        className="mt-10 p-8 rounded-2xl w-full"
        style={
          theme === "dark"
            ? { backgroundColor: "#0f172a", color: "white" }
            : { backgroundColor: "#E6F4FE", color: "black" }
        }
      >
        <h2 className="text-xl font-bold">Mise à jour</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-2 mt-5 max-[443px]:flex-col max-[443px]:gap-10 max-[443px]:items-center">
            <div>
              <div>
                <label htmlFor="" className="text-sm">
                  Nom du produit
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder={product.title}
                  defaultValue={product.title}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl px-4 py-2 mt-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="text-sm">
                  Description
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder={product.description}
                  defaultValue={product.description}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl p-2 mt-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="text-sm">
                  Prix
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder={product.price}
                  defaultValue={product.price}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl px-4 py-2 mt-2"
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
                  placeholder={product.slug}
                  defaultValue={product.slug}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl px-4 py-2 mt-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="text-sm">
                  catSlug
                </label>
                <input
                  type="text"
                  id="catSlug"
                  name="catSlug"
                  placeholder={product.catSlug}
                  defaultValue={product.catSlug}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl px-4 py-2 mt-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="text-sm">
                  cat
                </label>
                <input
                  type="text"
                  id="cat"
                  name="cat"
                  placeholder={product.cat}
                  defaultValue={product.cat}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl px-4 py-2 mt-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="text-sm">
                  Taille
                </label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  placeholder={product.size}
                  defaultValue={product.size}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl px-4 py-2 mt-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="text-sm">
                  Couleur
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  placeholder={product.color}
                  defaultValue={product.color}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl px-4 py-2 mt-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="active" className="text-sm">
                  En stock
                </label>
                <select
                  name="active"
                  id="active"
                  onChange={handleChange}
                  className="w-full border outline-none border-gray-300 text-sky-950 rounded-xl px-4 py-2 mt-2"
                >
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
              </div>
              <div className="flex items-center gap-5 max-[504px]:flex-col mt-4">
                <img
                  src={
                    files.length > 0
                      ? URL.createObjectURL(files[0])
                      : product.image[0] ||
                        "https://res.cloudinary.com/dzer4ijr1/image/upload/v1703108635/users/noavatar_xckjxl.png"
                  }
                  alt={product.title}
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
                  multiple
                  onChange={handleFileChange}
                  className="max-[504px]: max-[504px]:text-xs max-[504px]:w-full"
                />
              </div>
              <div className="max-[504px]:text-center">
                <button className="w-32 mt-4 bg-blue-950 text-white cursor-pointer p-2 rounded-2xl text-center">
                  Mettre à jour
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProduitInfos;
