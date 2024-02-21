"use server";


import connect from "@/app/lib/utils";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// Create product
export const POST = async (req) => {
  const {
    title,
    description,
    price,
    image,
    slug,
    catSlug,
    cat,
    size,
    color,
    inStock,
  } = await req.json();
  await connect();

  const newProduct = new Product({ 
    title,
    description,
    price,
    image,
    slug,
    catSlug,
    cat,
    size,
    color,
    inStock,
  });

  try {
    await newProduct.save();
    return new NextResponse(JSON.stringify({ message: "Produit créé" }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Database Error" }), {
      status: 500,
    });
  }
};
