"use server";

import Post from "@/models/Post";
import connect from "./utils";

export const fetchPosts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;

  try {
    connect();
    const count = await Post.find({ title: { $regex: regex } }).count();
    const posts = await Post.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1)) 
      .lean();
    return { count, posts };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Posts!");
  }
};




