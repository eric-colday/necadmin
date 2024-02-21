"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CategoriesProducts, Posts } from "@/data";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { notFound, useRouter } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useSession } from "next-auth/react";

const BASE_URL = process.env.NEXTAUTH_URL;

const getData = () => {
  const dataCat = CategoriesProducts;

  if (dataCat) {
    return dataCat;
  }

  return notFound();
};

const Article = ({ params }) => {
  const { theme } = useContext(ThemeContext);
  const { id } = params;
  const [post, setPost] = useState({});
  const dataCat = getData();
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const router = useRouter();
  const [modal, setModal] = useState(null);
  const [catSlug, setCatSlug] = useState("");
  const [cat, setCat] = useState("");
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    const getData = async () => {
      // const res = await fetch(`http://localhost:3000/api/posts/` + id, {
      //   cache: "no-store",
      // });

      const res = await fetch(`https://necadmin.vercel.app/api/posts/` + id, {
        cache: "no-store",
      });

      if (!res.ok) {
        return notFound(); 
      }

      const jsonData = await res.json();
      setPost(jsonData);
    };

    getData();
  }, [id]);

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    let imageUrl = post.image; // Utilisez l'image actuelle par défaut

    // Si un nouveau fichier a été sélectionné, téléchargez-le et mettez à jour l'URL de l'image
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

    // Mettez à jour l'article avec la nouvelle URL de l'image (ou l'ancienne si aucune nouvelle image n'a été téléchargée)
    const updatePost = {
      ...post,
      title: title || post.title,
      slug: slugify(title || post.title),
      img: imageUrl,
      content: desc || post.content,
      catSlug: catSlug || post.catSlug,
      cat: cat || post.cat,
    };

    try {
      const res = await fetch("http://localhost:3000/api/posts/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePost),
      });
      const responseData = await res.json();
      if (responseData) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = (id) => {
    setModal(id);
  };

  const handleDelete = async (_id) => {
    try {
      const res = await fetch("http://localhost:3000/api/posts/" + _id, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete the post");
      }
      router.push("/dashboard/articles");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="ml-80 pb-16 max-[818px]:ml-0 max-[818px]:mt-12 px-10 pt-20">
        <div className="">
          <div className="mb-[20rem]">
            <img
              src={file ? URL.createObjectURL(file) : post.img}
              alt={post.title}
              className="w-full h-[200px] object-cover rounded-2xl"
            />
            {updateMode ? (
              <input
                type="text"
                value={title || post.title}
                className="w-full p-[50px] text-[28px] max-[]: border-none outline-none bg-transparent text-[var(--textColor)] "
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <div className="py-5 ">
                <h1 className="text-[28px] font-bold flex justify-around items-center text-center max-[610px]:flex-col ">
                  {post.title}
                  {
                    <div className="flex gap-8 ">
                      <span
                        className="text-green-600 "
                        onClick={() => setUpdateMode(true)}
                      >
                        <EditIcon />
                      </span>
                      <span
                        className="text-red-600 "
                        onClick={() => openModal(post._id)}
                      >
                        <DeleteIcon />
                      </span>
                    </div>
                  }
                </h1>
                {modal === post._id ? (
                  <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                      className=" p-4 h-48 flex flex-col justify-center items-center rounded-2xl"
                      style={
                        theme === "dark"
                          ? { backgroundColor: "#0f172a", color: "white" }
                          : { backgroundColor: "#E6F4FE", color: "black" }
                      }
                    >
                      <h1 className="text-xl font-bold mb-4">{post.title}</h1>
                      <p className="text-center">
                        Voulez-vous vraiment supprimer cet article ?
                      </p>
                      <div className="flex gap-4 mt-4">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-2xl"
                          onClick={() => handleDelete(post._id)}
                        >
                          Oui
                        </button>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-2xl"
                          onClick={() => setModal(false)}
                        >
                          Non
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
            {updateMode ? (
              <div className="flex justify-between items-center pb-5 ">
                <div className="flex flex-col gap-4">
                  <label htmlFor="">Selectionner catSlug</label>
                  <select
                    className="px-[10px] py-[20Px] outline-none border "
                    defaultValue={
                      post.length > 0 ? post[0].slug : "Aucune catégorie"
                    }
                    onChange={(e) => setCatSlug(e.target.value)}
                  >
                    {dataCat.map((cat) => (
                      <option value={cat.slug}>{cat.title}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="">Selectionner cat</label>
                  <select
                    className="px-[10px] py-[20Px] outline-none border "
                    defaultValue={
                      dataCat.length > 0 ? dataCat[0].slug : "Aucune catégorie"
                    }
                    onChange={(e) => setCat(e.target.value)}
                  >
                    {dataCat.map((cat) => (
                      <option value={cat.slug}>{cat.title}</option>
                    ))}
                  </select>
                </div>
                <button
                  className="w-40 h-16 px-[10px] py-[20px] border-none bg-blue-950 text-white cursor-pointer rounded-[20px]"
                  onClick={handleUpdate}
                >
                  Mettre à jour
                </button>
              </div>
            ) : null}

            <div className="flex justify-between text-yellow-600 py-10 max-[375px]:flex-col max-[375px]:text-center ">
              <Link href={`/dashboard/profile/${user?.username}`} className="link">
                <span className="capitalize">
                  Auteur : {" "}
                  {post.fullname}
                </span>
              </Link>
              <span className=""> 
                Publié : {" "}
                {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
              </span>
            </div>
            {updateMode ? (
              <div className="flex flex-col max-[768px]:flex-col gap-[30px] mb-[50rem] relative z-[100] ">
                <button
                  className="rounded-full h-10 w-10  bg-transparent border-[1px] border--[var(--textColor)] flex items-center justify-center cursor-pointer "
                  onClick={() => setOpen(!open)}
                >
                  <Image src="/plus.png" alt="" width={10} height={10} />
                </button>
                {open && (
                  <div className="flex gap-[20px] bg-[var(--bg)] absolute z-[999] w-full left-[50px]  ">
                    <input
                      type="file"
                      id="image"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                    <button className="w-[36px] h-[36px] rounded-full bg-transparent border-[1px] border--[var(--textColor)] border-blue-950 flex items-center justify-center cursor-pointer ">
                      <label htmlFor="image">
                        <Image src="/image.png" alt="" width={16} height={16} />
                      </label>
                    </button>
                  </div>
                )}
                <ReactQuill
                  theme="bubble"
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"],
                      ["blockquote", "code-block"],

                      [{ header: 1 }, { header: 2 }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ script: "sub" }, { script: "super" }],
                      [{ indent: "-1" }, { indent: "+1" }],
                      [{ direction: "rtl" }],

                      [{ size: ["small", false, "large", "huge"] }],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],

                      [{ color: [] }, { background: [] }],
                      [{ font: [] }],
                      [{ align: [] }],
                      ["link", "image", "video"],

                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "align",
                    "link",
                    "image",
                    "video",
                  ]}
                  value={desc || post.content}
                  onChange={
                    (setDesc,
                    (content, delta, source, editor) => {
                      setDesc(editor.getHTML());
                    })
                  }
                  placeholder={post.content}
                  className="w-full h-full bg-transparent relative z-[100] "
                />
              </div>
            ) : (
              <p
                className="pb-10 "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
