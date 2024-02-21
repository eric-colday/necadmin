import connect from "@/app/lib/utils";
import CategoryPost from "@/models/CategoryPost";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    // FIND CATEGORY BY ID
    const category = await CategoryPost.findById(id);
    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
}; 

export const PUT = async (request, { params }) => {
  const { id } = params;
  const {
    title,
    slug,
  } = await request.json();  
  try {
    await connect();
    // FIND CATEGORY BY ID AND UPDATE
    await CategoryPost.findByIdAndUpdate( 
      id,
      {
        title,
        slug,
      },
      { new: true }
    );
    return new NextResponse(JSON.stringify({ message: "Catégorie mis à jour" }), {
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
    // FIND CATEGORY BY ID AND DELETE
    await CategoryPost.findByIdAndDelete(id);
    return new NextResponse(
      JSON.stringify({ message: "Catégorie supprimée" }), 
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
