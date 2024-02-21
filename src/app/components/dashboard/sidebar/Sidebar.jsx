"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ArticleIcon from "@mui/icons-material/Article";
import CloseIcon from "@mui/icons-material/Close";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ThemeToggle from "@/app/components/themeToggle/ThemeToggle";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState({});
  const userId = session?.user._id;

  if (status === "unauthenticated") {
    router.push("/connexion");
  }

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

  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div>
      {/* Menu 2 */}
      <div
        className="w-full h-20 border-b fixed top-0 z-50 hidden max-[818px]:block"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="h-full px-8 flex items-center justify-between ">
          <Link href="/dashboard">
            <div>
              <h1 className="logo font-bold text-2xl text-blue-500 cursor-pointer">
                NecAdmin
              </h1>
            </div>
          </Link>
          <div className="flex items-center p-3 gap-6">
            {/* Menu 3 */}
            {showLinks ? (
              <div
                className="
                opacity-95 bottom-0 overflow-y-auto scrollbar
                flex flex-col
                fixed top-0 right-0 h-full w-64 z-50
                bg-[#0f172a] shadow-lg
                transition duration-500  ease-in-out
                transform translate-x-0 
                "
                onClick={handleShowLinks}
              >
                <CloseIcon
                  onClick={handleShowLinks}
                  className="
                  absolute top-3 right-3
                  text-white text-2xl cursor-pointer
                  "
                />
                <div className="flex flex-col p-6 gap-6">
                  <Link
                    href={`/dashboard/profile/${user.username}`}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={user.image}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-white capitalize">
                          {user.fullname ? user.fullname : user.username}
                        </span>
                        <span className="text-white text-sm">
                          {user.isAdmin ? (
                            <span className="text-blue-500">
                              Administrateur
                            </span>
                          ) : null}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <ul className="flex flex-col p-3 gap-6 text-white">
                    <Link href="/dashboard" className="flex items-center">
                      <HomeIcon className="text-xl mr-2" />
                      <li className="cursor-pointer flex items-center">
                        Tableau de bord
                      </li>
                    </Link>
                    <Link
                      href="https://necstore.vercel.app/"
                      className="flex items-center"
                    >
                      <StorefrontIcon className="text-xl mr-2" />
                      <li className="cursor-pointer flex items-center">
                        Boutique
                      </li>
                    </Link>
                    <Link
                      href="/dashboard/utilisateurs"
                      className="flex items-center"
                    >
                      <PermIdentityIcon className="text-xl mr-2" />
                      <li className="cursor-pointer flex items-center">
                        Utilisateurs
                      </li>
                    </Link>
                    <Link
                      href="/dashboard/produits"
                      className="flex items-center"
                    >
                      <Inventory2Icon className="text-xl mr-2" />
                      <li className="cursor-pointer flex items-center">
                        Produits
                      </li>
                    </Link>
                    <Link
                      href="/dashboard/commandes"
                      className="flex items-center"
                    >
                      <ListAltIcon className="text-xl mr-2" />
                      <li className="cursor-pointer flex items-center">
                        Commandes
                      </li>
                    </Link>
                    <Link
                      href="/dashboard/articles"
                      className="flex items-center"
                    >
                      <ArticleIcon className="text-xl mr-2 " />
                      <li className=" cursor-pointer flex items-center  ">
                        Articles
                      </li>
                    </Link>
                    <button className="flex items-center">
                      <LogoutIcon className="text-3xl text-white cursor-pointer mb-2" onClick={signOut}/>
                    </button>
                    <ThemeToggle />
                  </ul>
                  <div className="text-sm mt-10 text-center">
                    <span>
                      © Copyright 2023. <br /> All Rights Reserved
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <Image
                src="/burger.svg"
                alt="menu"
                width={30}
                height={30}
                className={showLinks ? "" : "hidden  max-[782px]:block"}
                onClick={handleShowLinks}
                style={{ filter: "invert(1)" }}
              />
            )}
          </div>
          <div className="flex items-center p-3 gap-6 text-white max-[782px]:hidden">
            <Link
              href="/dashboard"
              className="flex items-center cursor-pointer "
            >
              <HomeIcon className="text-xl mr-2" />
            </Link>
            <Link
              href="https://necstore.vercel.app/"
              className="flex items-center"
            >
              <StorefrontIcon className="text-xl mr-2" />
            </Link>
            <Link
              href="/dashboard/utilisateurs"
              className="flex items-center cursor-pointer"
            >
              <PermIdentityIcon className="text-xl mr-2" />
            </Link>
            <Link
              href="/dashboard/produits"
              className="flex items-center cursor-pointer"
            >
              <Inventory2Icon className="text-xl mr-2" />
            </Link>
            <Link
              href="/dashboard/commandes"
              className="flex items-center cursor-pointer"
            >
              <ListAltIcon className="text-xl mr-2" />
            </Link>
            <Link
              href="/dashboard/articles"
              className="flex items-center cursor-pointer"
            >
              <ArticleIcon className="text-xl mr-2" />
            </Link>
            <ThemeToggle />
            <Link
              href={`/dashboard/profile/${user.username}`}
              className="cursor-pointer "
            >
              <img
                src={user.image}
                className="w-12 h-12 object-cover rounded-full"
              />
            </Link>
            <button type="submit">
              <LogoutIcon
                className="text-3xl text-white cursor-pointer mb-2"
                onClick={signOut}
              />
            </button>
          </div>
        </div>
      </div>
      {/* Menu 1 */}
      <div
        className="flex-1 h-full overflow-scroll fixed top-50 z-50 max-[818px]:hidden"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="p-10 text-slate-50 ">
          <Link href="/dashboard">
            <span className="font-bold text-2xl text-blue-500 cursor-pointer">
              NecAdmin
            </span>
          </Link>
          <div className="flex flex-col p-3 gap-6">
            <Link
              href={`/dashboard/profile/${user.username}`}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <img
                  src={user.image}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-sm capitalize ">
                    {user.fullname ? user.fullname : user.username}
                  </span>
                  <span className="text-white text-sm">
                    {user.isAdmin ? (
                      <span className="text-blue-500">Administrateur</span>
                    ) : null}
                  </span>
                </div>
              </div>
            </Link>
            <ul className="flex flex-col p-3 gap-6">
              <Link href="/dashboard" className="flex items-center">
                <HomeIcon className="text-xl mr-2" />
                <li className="cursor-pointer flex items-center">
                  Tableau de bord
                </li>
              </Link>
              <Link
                href="https://necstore.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <StorefrontIcon className="text-xl mr-2" />
                <li className="cursor-pointer flex items-center">Boutique</li>
              </Link>
              <Link
                href="/dashboard/utilisateurs"
                className="flex items-center"
              >
                <PermIdentityIcon className="text-xl mr-2" />
                <li className="cursor-pointer flex items-center  ">
                  Utilisateurs
                </li>
              </Link>
              <Link href="/dashboard/produits" className="flex items-center">
                <Inventory2Icon className="text-xl mr-2" />
                <li className="cursor-pointer flex items-center">Produits</li>
              </Link>
              <Link href="/dashboard/commandes" className="flex items-center">
                <ListAltIcon className="text-xl mr-2" />
                <li className="cursor-pointer flex items-center">Commandes</li>
              </Link>
              <Link href="/dashboard/articles" className="flex items-center">
                <ArticleIcon className="text-xl mr-2" />
                <li className=" cursor-pointer flex items-center ">Articles</li>
              </Link>
              <button type="submit" className="flex items-center">
                <LogoutIcon
                  className="text-3xl text-white cursor-pointer"
                  onClick={signOut}
                />
              </button>
              <ThemeToggle />
            </ul>
          </div>
          <div className="text-sm mt-40">
            <span>
              © Copyright 2023. <br /> All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
