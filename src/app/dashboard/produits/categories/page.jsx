import React from "react";
import Link from "next/link";
import Search from "../../../components/dashboard/search/Search";
import {CategoriesPosts} from "../../../../data";
import TableCat from "../../../components/dashboard/produits/TableCat";
import Pagination from "../../../components/dashboard/pagination/Pagination";
import InputsCat from "../../../components/dashboard/produits/InputsCat";

const getData = () => {
  const data = CategoriesPosts;

  if (data) {
    return data;
  }

  return notFound();
};

const Categories = ({ searchParams }) => {
  const data = getData();
  const page = searchParams?.page || 1;
  const count = data.length;

  return (
    <div className="ml-72 pb-20  max-[818px]:ml-0 max-[818px]:mt-12 px-10 pt-20">
      <div className="grid grid-cols-2 max-[552px]:grid-cols-0 max-[552px]:flex max-[552px]:flex-col max-[552px]:gap-10 items-center">
        <h1 className="text-3xl  max-[552px]:text-3xl font-bold">Catégories</h1>
        <div className="w-full flex gap-6">
          <Search placeholder="Recherche une catégorie..." />
        </div>
      </div>
        <div className="w-full grid grid-cols-2 gap-5 max-[1082px]:grid-cols-1 ">
        <InputsCat/>
          <div> 
            <TableCat data={data} page={page} />
            <Pagination count={count} page={page} />
          </div>
        </div>
    </div>
  );
};

export default Categories;
