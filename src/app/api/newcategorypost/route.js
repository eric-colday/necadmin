"use server";

import connect from "@/app/lib/utils";
import CategoryPosts from "@/models/CategoryPost";
import { NextResponse } from "next/server";

// Create a new category
export const POST = async (req) => {
  const {
    title,
    slug,
  } = await req.json();
  await connect();

  const newCategory = new CategoryPosts({  
    title,
    slug,
  });

  try {
    await newCategory.save();
    return new NextResponse(JSON.stringify({ message: "Catégorie créé" }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Database Error" }), {
      status: 500,
    });
  }
};
