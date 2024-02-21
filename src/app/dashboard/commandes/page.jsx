import { fetchOrders } from "@/app/lib/ordersData";
import Table from "@/app/components/dashboard/commandes/Table";
import Pagination from "@/app/components/dashboard/pagination/Pagination";
import Search from "@/app/components/dashboard/search/Search";
import React from "react";



const Commandes = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, orders } = await fetchOrders(q, page); 

  const simpleOrders = JSON.parse(JSON.stringify(orders));

  return (
    <div className="ml-80 pb-20 max-[818px]:ml-0 max-[818px]:mt-12 px-10 max-[375px]:px-2 pt-20">
      <div className="grid grid-cols-2 max-[552px]:grid-cols-0 max-[552px]:flex max-[552px]:flex-col max-[552px]:gap-10 items-center">
        <h1 className="text-3xl  max-[552px]:text-3xl font-bold">Commandes</h1>
        <div className="w-full flex gap-6">
          <Search placeholder="Recherche une commande..." />
        </div>
      </div>
      <Table data={simpleOrders} />
      <Pagination count={count} />
    </div>
  );
};

export default Commandes;
