"use server";

import Order from "@/models/Order";
import connect from "./utils";

export const fetchOrders = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;

  try {
    connect(); 
    const count = await Order.find({ userEmail: { $regex: regex } }).count();
    const orders = await Order.find({ userEmail: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1)) 
      .lean();
    return { count, orders };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Orders!");
  }
};




