"use server";

import Product from "@/models/Product";
import connect from "./utils";

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;

  try {
    connect();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1)) 
      .lean();
    return { count, products };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Products!");
  }
};




