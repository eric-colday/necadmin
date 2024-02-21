"use server";


import User from "@/models/User";
import connect from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;

  try {
    connect();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean(); // Convertit les documents Mongoose en objets JavaScript simples
    return { count, users };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};




