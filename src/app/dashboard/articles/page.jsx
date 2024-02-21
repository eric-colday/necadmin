import React from "react";
import Search from "@/app/components/dashboard/search/Search";
import Link from "next/link";
import Table from "@/app/components/dashboard/articles/Table";
import Pagination from "@/app/components/dashboard/pagination/Pagination";
import { fetchPosts } from "@/app/lib/postsData";


const Articles = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, posts } = await fetchPosts(q, page); 

  const simplePosts = JSON.parse(JSON.stringify(posts));

  return (
    <div>
      <div className="ml-80 pb-20 max-[818px]:ml-0 max-[818px]:mt-12 px-10 pt-20">
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
        <Table data={simplePosts}/>
        <Pagination count={count} />
      </div>
    </div>
  );
};

export default Articles;
