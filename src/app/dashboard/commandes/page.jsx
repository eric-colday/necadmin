import Table from "../../components/dashboard/commandes/Table";
import Pagination from "../../components/dashboard/pagination/Pagination";
import Search from "../../components/dashboard/search/Search";
import { Orders } from "../../../data";
import Link from "next/link";
import React from "react";

const getData = () => {
  const data = Orders;

  if (data) {
    return data;
  }

  return notFound();
};

const Commandes = ({ searchParams }) => {
  const data = getData();
  const page = searchParams?.page || 1;
  const count = data.length;

  return (
    <div className="ml-72 pb-20 max-[818px]:ml-0 max-[818px]:mt-12 px-10 pt-20">
      <div className="grid grid-cols-2 max-[552px]:grid-cols-0 max-[552px]:flex max-[552px]:flex-col max-[552px]:gap-10 items-center">
        <h1 className="text-3xl  max-[552px]:text-3xl font-bold">Commandes</h1>
        <div className="w-full flex gap-6">
          <Search placeholder="Recherche une commande..." />
        </div>
      </div>
      <Table data={data} page={page} />
      <Pagination count={count} />
    </div>
  );
};

export default Commandes;
