"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PublishIcon from "@mui/icons-material/Publish";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const UserInfos = () => {
  const { theme } = useContext(ThemeContext);
  const [file, setFile] = useState("");
  const [update, setUpdate] = useState({});
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});
  const userId = session?.user._id;

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      }
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = user.image;

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");
      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dzer4ijr1/image/upload",
          data
        );
        imageUrl = uploadRes.data.url;
      } catch (err) {
        console.log(err);
      }
    }

    // Mettez à jour l'utilisateur avec la nouvelle URL de l'image (ou l'ancienne si aucune nouvelle image n'a été téléchargée)
    const updateUser = {
      ...update,
      image: imageUrl,
    };

    try {
      const res = await fetch("/api/users/" + userId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUser),
      });

      window.location.reload();
      window.alert("Profil mis à jour");
      toast.success("Profil mis à jour!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setUpdate((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleDelete = async (userId) => {
    try {
      await fetch("/api/users/" + userId, {
        method: "DELETE",
      });
      signOut();
      router.push("/");
      toast.error("Compte supprimé");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex gap-4 w-full max-[914px]:flex-col">
      {/* DIV 1 */}
      <div
        className="mt-10 p-8 rounded-2xl w-2/3 max-[914px]:w-full"
        style={
          theme === "dark" 
            ? { backgroundColor: "#0f172a", color: "white" }
            : { backgroundColor: "#E6F4FE", color: "black" }
        }
      >
        <div className="flex items-center gap-5">
          <img
            src={user.image}
            alt="avatar"
            className="w-10 h-10 object-cover border rounded-full"
          />
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <h2 className="font-bold">Détails du compte</h2>
          <div className="flex items-center gap-2">
            <PersonIcon />
            <span className="capitalize ">
              {user.fullname ? user.fullname : user.username}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneAndroidIcon />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MailOutlineIcon />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <LocationSearchingIcon />
            <span>{user.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              Rôle :{" "}
              {user.isAdmin ? (
                <span className="text-red-400">Admin</span>
              ) : (
                <span className="text-green-600">Utilisateur</span>
              )}
            </span>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <h2 className="font-bold">Activités</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <Link href="/commandes">Mes commandes</Link>
          </div>
          <div className="flex items-center gap-2 text-red-400 cursor-pointer" onClick={() => handleDelete(userId)}>
            <DeleteIcon />
            <span>Supprimer le compte</span>
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
          <div className="flex justify-between gap-2 mt-5 max-[443px]:flex-col max-[443px]:gap-10 max-[443px]:items-center">
            <div>
              <div>
                <label htmlFor="" className="text-sm">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder={user.username}
                  defaultValue={user.username}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 bg-white rounded-xl p-1 mt-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="text-sm">
                  Nom et prenom
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder={user.fullname}
                  defaultValue={user.fullname}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 bg-white rounded-xl p-1 mt-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="text-sm">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder={user.email}
                  defaultValue={user.email}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 bg-white rounded-xl p-1 mt-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="text-sm">
                  Téléphone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder={user.phone}
                  defaultValue={user.phone}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 bg-white rounded-xl p-1 mt-2"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="" className="text-sm">
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder={user.address}
                  defaultValue={user.address}
                  onChange={handleChange}
                  required
                  className="w-full border outline-none border-gray-300 text-sky-950 bg-white rounded-xl p-1 mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-72 max-[443px]:gap-5">
              <div className="flex items-center gap-5">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : user.image ||
                        "https://res.cloudinary.com/dzer4ijr1/image/upload/v1703108635/users/noavatar_xckjxl.png"
                  }
                  alt="avatar"
                  className="w-28 h-28 border rounded-xl object-cover"
                />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button className="w-32 bg-blue-950 text-white cursor-pointer p-2 rounded-2xl text-center">
                Mettre à jour
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfos;
