
import Link from 'next/link'
import React from 'react'
import { notFound } from 'next/navigation';
import ProduitInfos from '@/app/components/dashboard/produits/ProduitInfos';

async function getData(id) {
  const res = await fetch("http://localhost:3000/api/products/" + id, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();  
}


const Produit = async ({params}) => {
  const { id } = params;
  const data = await getData(id); 


  return (
    <div>
      <div className="ml-80 pb-16 max-[818px]:ml-0 max-[818px]:mt-12 px-10 pt-20">
      <div className="grid grid-cols-2 max-[552px]:grid-cols-0 max-[552px]:flex max-[552px]:flex-col max-[552px]:gap-10 items-center">
          <h1 className="text-3xl  max-[552px]:text-3xl max-[552px]:text-center font-bold">
            {data.title}
          </h1>
          <Link href="/dashboard/produits/creer">
            <div className="flex justify-end ">
              <button className="w-32 bg-blue-950 text-white cursor-pointer p-2 rounded-2xl text-center">
                Créer
              </button>
            </div>
          </Link>
        </div>
        <ProduitInfos product={data}/>  
      </div>
    </div> 
  )
}

export default Produit
