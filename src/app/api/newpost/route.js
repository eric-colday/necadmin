"use server";

import { getAuthSession } from "@/app/auth";
import connect from "@/app/lib/utils";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// Create post
export const POST = async (req) => {
  const session = await getAuthSession();

  const { img, title, content, slug, catSlug, cat, fullname } = await req.json();
  await connect();

  const newPost = new Post({
    img,
    title,
    content,
    slug,
    catSlug, 
    cat,
    fullname, 
  });

  if (session) {
    try {
      await newPost.save();
      return new NextResponse(JSON.stringify({ message: "Article créé" }), {
        status: 201,
      });
    } catch (error) {
      return new NextResponse(JSON.stringify({ message: "Database Error" }), {
        status: 500,
      });
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
};
