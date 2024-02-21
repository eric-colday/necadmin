import Search from "@/app/components/dashboard/search/Search";
import Link from "next/link";
import React from "react";
import Pagination from "@/app/components/dashboard/pagination/Pagination";
import Table from "@/app/components/dashboard/utilisateurs/Table";
import { fetchUsers } from "@/app/lib/usersData";


export const metadata = {
  title: "Utilisateurs - NecAdmin",
  description: "Les utilisateurs du tableau de bord NecAdmin",
};

const Utilisateurs = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);  
  
  // Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.
  const simpleUsers = JSON.parse(JSON.stringify(users));

  return (
    <div> 
      <div className="ml-80 pb-20 max-[818px]:ml-0 max-[818px]:mt-12 px-10 pt-20">
        <div className="grid grid-cols-2 max-[552px]:grid-cols-0 max-[552px]:flex max-[552px]:flex-col max-[552px]:gap-10 items-center">
          <h1 className="text-3xl  max-[552px]:text-3xl font-bold">
            Utilisateurs
          </h1>
          <div className="w-full flex gap-6">
            <Search placeholder="Recherche utilisateur..." />
            <Link href="/dashboard/utilisateurs/creer"> 
              <div className="flex justify-end ">
                <button className="w-20 bg-blue-950 text-white cursor-pointer p-2 rounded-2xl text-center">
                  Créer
                </button> 
              </div>
            </Link> 
          </div>
        </div>
        <Table data={simpleUsers} /> 
        <Pagination count={count} />
      </div>
    </div>
  );
};

export default Utilisateurs;
