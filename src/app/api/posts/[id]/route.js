import connect from "@/app/lib/utils";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;
  try { 
    await connect();
    // FIND POST BY ID
    const post = await Post.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
}; 

export const PUT = async (request, { params }) => {
  const { id } = params;
  const {
    img,
    title,
    content,
    slug,
    catSlug,
    cat
  } = await request.json(); 
  try {
    await connect();
    // FIND USER BY ID AND UPDATE
    await Post.findByIdAndUpdate( 
      id,
      {
        img,
        title,
        content,
        slug,
        catSlug,
        cat
      },
      { new: true }
    );
    return new NextResponse(JSON.stringify({ message: "Article mis à jour" }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Database Error" }), {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    // FIND PRODUCT BY ID AND DELETE
    await Post.findByIdAndDelete(id);
    return new NextResponse(
      JSON.stringify({ message: "Acticle supprimé" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Database Error" }), {
      status: 500,
    });
  }
};
