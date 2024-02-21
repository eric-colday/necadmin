import CatInfos from "@/app/components/dashboard/produits/CatInfos";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";

async function getData(id) {
  // const res = await fetch("http://localhost:3000/api/categoryproducts/" + id, {
  //   cache: "no-store",
  // });

  const res = await fetch("https://necadmin.vercel.app/api/categoryproducts/" + id, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();  
}

const Categorie = async ({ params }) => {
  const { id } = params;
  const data = await getData(id); 

  return (
    <div className="ml-80 pb-56 max-[818px]:ml-0 max-[818px]:mt-12 px-10 pt-20">
      <div className="grid grid-cols-2 max-[552px]:grid-cols-0 max-[552px]:flex max-[552px]:flex-col max-[552px]:gap-10 items-center">
        <h1 className="text-3xl  max-[552px]:text-3xl max-[552px]:text-center font-bold">
          Catégorie : {data.title}
        </h1>
        <Link href="/dashboard/produits/categories">
          <div className="flex justify-end ">
            <button className="w-32 bg-blue-950 text-white cursor-pointer p-2 rounded-2xl text-center">
              Créer
            </button>
          </div>
        </Link>
      </div>
      <CatInfos data={data} />
    </div>
  );
};

export default Categorie;
