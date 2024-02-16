"use client";

import React, { useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import { useRouter } from "next/navigation";
import axios from "axios";

const Inputs = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dzer4ijr1/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        image: url,
      };

      const res = await fetch("/api/newuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const responseData = await res.json();
      if (responseData) {
        window.location.reload();
        window.alert("Utilisateur créé");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-5">
        <img
          src={file ? URL.createObjectURL(file) : "/person/noavatar.png"}
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
        />
      </div>
      <div className="grid grid-cols-2 max-[425px]:grid-cols-1 gap-6">
        {/* Input 1 */}
        <div>
          <div className="mt-10">
            <label htmlFor="" className="text-sm">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Eric"
              required
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="fullname" className="text-sm">
              Nom et prenom
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Eric Colday"
              required
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="eric@gmail.com"
              required
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-sm">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-sm">
              Téléphone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="+33 6 98 34 20 60"
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
              Adresse
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Paris, France"
              required
              className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
              onChange={handleChange}
            />
          </div>
          <div className="mt-12 max-[425px]:mt-5">
            <label htmlFor="" className="text-sm">
              Genre
            </label>
            <div className="flex gap-2">
              <input
                type="radio"
                name="genre"
                id="genre"
                value="male"
                required
                onChange={handleChange} 
              />
              <label htmlFor="male">Homme</label>
              <input
                type="radio"
                name="genre"
                id="genre"
                value="female"
                onChange={handleChange}
              />
              <label htmlFor="female">Femme</label>
            </div>
            <div className="mt-5">
              <label htmlFor="" className="text-sm">
                Active
              </label>
              <select
                name="active"
                id="active"
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
            <div className="mt-5">
              <label htmlFor="isAdmin">Rôle</label>
              <select
                name="isAdmin"
                id="isAdmin"
                className="w-full border outline-none border-gray-300 rounded-xl p-2 mt-2"
                onChange={handleChange}
              >
                <option value="true">Admin</option>
                <option value="false">Client</option>
              </select>
            </div>
            <div className="mt-5 max-[425px]:mt-0">
              <label htmlFor="" className="text-sm">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                placeholder="eric"
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default Inputs;
