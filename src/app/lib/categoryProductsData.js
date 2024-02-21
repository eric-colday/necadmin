"use server";

import CategoryProduct from "@/models/CategoryProduct";
import connect from "./utils";

export const fetchCategoryProducts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;

  try {
    connect();
    const count = await CategoryProduct.find({
      title: { $regex: regex },
    }).count();
    const categoriesproducts = await CategoryProduct.find({
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();
    return { count, categoriesproducts };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories!");
  }
};
