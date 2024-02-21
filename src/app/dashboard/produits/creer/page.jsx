import Link from "next/link";
import React from "react";
import Inputs from "@/app/components/dashboard/produits/Inputs";

export const metadata = {
  title: "Nouvel utilisateur - NecAdmin",
  description: "Pour créer un nouvel utilisateur du tableau de bord NecAdmin",
};

const NouveauProduit = () => {
  return ( 
    <div> 
      <div className="ml-80 pb-80 max-[818px]:ml-0 max-[818px]:mt-12 px-10 pt-20">
        <div className="grid grid-cols-2 max-[552px]:grid-cols-0 max-[552px]:flex max-[552px]:flex-col max-[552px]:gap-10 items-center">
          <h1 className="text-3xl  max-[552px]:text-3xl max-[552px]:text-center font-bold">
            Nouveau Produit
          </h1>
          <Link href="/dashboard/produits">
            <div className="flex justify-end ">
              <button className="w-32 bg-blue-950 text-white cursor-pointer p-2 rounded-2xl text-center">
                Produits
              </button>
            </div>
          </Link>
        </div>
        <div className="mt-10"> 
          <Inputs/>
        </div>
      </div>
    </div>
  );
};

export default NouveauProduit;
