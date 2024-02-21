"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; 


const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", 1);

    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }, 300);


  return (
    <form className="w-full flex">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        className="w-full p-2 outline-none border-2 rounded-l-lg"
      />
      <button
        type="submit"
        className="w-28 bg-blue-950 text-white  cursor-pointer p-2 rounded-r-lg max-[900px]:hidden max-[818px]:block max-[690px]:hidden  max-[552px]:block  max-[386px]:hidden"
      >
        Recharger
      </button>
      <div className="w-10 bg-blue-950 cursor-pointer p-2 rounded-r-lg hidden max-[900px]:flex max-[900px]:items-center max-[818px]:hidden max-[690px]:flex max-[690px]:items-center  max-[552px]:hidden  max-[386px]:flex max-[386px]:items-center">
        <img
          src="/search.svg"
          alt="Logo de la recherche"
          className="w-5 h-5 text-white"
        />
      </div>
    </form>
  );
};

export default Search;
