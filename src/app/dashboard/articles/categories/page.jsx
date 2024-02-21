import InputsCat from "@/app/components/dashboard/articles/InputsCat";
import TableCat from "@/app/components/dashboard/articles/TableCat";
import Pagination from "@/app/components/dashboard/pagination/Pagination";
import Search from "@/app/components/dashboard/search/Search";
import { fetchCategoryPosts } from "@/app/lib/categoryPostsData";
import React from "react";


const Categories = async({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, categoriesposts } = await fetchCategoryPosts(q, page);

  const simpleCategories = JSON.parse(JSON.stringify(categoriesposts));

  return (
    <div className="ml-80 pb-20  max-[818px]:ml-0 max-[818px]:mt-12 px-10 pt-20">
      <div className="grid grid-cols-2 max-[552px]:grid-cols-0 max-[552px]:flex max-[552px]:flex-col max-[552px]:gap-10 items-center">
        <h1 className="text-3xl  max-[552px]:text-3xl font-bold">Catégories</h1>
        <div className="w-full flex gap-6">
          <Search placeholder="Recherche une catégorie..." />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-5 max-[1082px]:grid-cols-1 ">
        <InputsCat />
        <div>
          <TableCat data={simpleCategories} />
          <Pagination count={count} page={page} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
