"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 2;

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="p-10 max-[425px]:px-0 flex justify-between">
      <button
        className="cursor-pointer px-2 py-4 "
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")} 
      >
        Précédent
      </button>
      <button
        className="cursor-pointer px-2 py-4"
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
