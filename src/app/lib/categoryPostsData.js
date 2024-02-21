"use server";

import CategoryPosts from "@/models/CategoryPost";
import connect from "./utils";

export const fetchCategoryPosts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;

  try {
    connect();
    const count = await CategoryPosts.find({
      title: { $regex: regex },
    }).count();
    const categoriesposts = await CategoryPosts.find({
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();
    return { count, categoriesposts };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories!");
  }
};
