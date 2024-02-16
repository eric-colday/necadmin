import React from "react";
import Search from "../../components/dashboard/search/Search";
import Link from "next/link";
import Table from "../../components/dashboard/articles/Table";
import Pagination from "../../components/dashboard/pagination/Pagination";
import { Posts } from "../../../data";

const getData = () => {
  const data = Posts;

  if (data) {
    return data;
  }

  return notFound();
};

const Articles = ({ searchParams }) => {
  const data = getData();
  const page = searchParams?.page || 1;
  const count = data.length;

  return (
    <div>
      <div className="ml-72 pb-20 max-[818px]:ml-0 max-[818px]:mt-12 px-10 pt-20">
        <div className="grid grid-cols-2 max-[1324px]:grid-cols-1 max-[1324px]:gap-5 max-[552px]:grid-cols-0 max-[552px]:flex max-[552px]:flex-col max-[552px]:gap-10 items-center">
          <h1 className="text-3xl  max-[552px]:text-3xl font-bold">Articles</h1>
          <div className="w-full flex gap-6 max-[552px]:flex-col max-[552px]:items-center">
            <Search placeholder="Recherche un article..." />
            <Link href="/dashboard/articles/categories">
              <div className="flex justify-end ">
                <button className="w-36 bg-blue-950 text-white cursor-pointer p-2 rounded-2xl text-center">
                  Catégories
                </button>
              </div>
            </Link>
            <Link href="/dashboard/articles/creer">
              <div className="flex justify-end ">
                <button className="w-20 bg-blue-950 text-white cursor-pointer p-2 rounded-2xl text-center">
                  Créer
                </button>
              </div>
            </Link>
          </div>
        </div>
        <Table data={data} page={page} />
        <Pagination count={count} />
      </div>
    </div>
  );
};

export default Articles;
