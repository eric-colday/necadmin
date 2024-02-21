import connect from "@/app/lib/utils";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    // FIND PRODUCT BY ID
    const product = await Product.findById(id);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
}; 

export const PUT = async (request, { params }) => {
  const { id } = params;
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
  } = await request.json(); 
  try {
    await connect();
    // FIND USER BY ID AND UPDATE
    await Product.findByIdAndUpdate( 
      id,
      {
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
      },
      { new: true }
    );
    return new NextResponse(JSON.stringify({ message: "Produit mis à jour" }), {
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
    await Product.findByIdAndDelete(id);
    return new NextResponse(
      JSON.stringify({ message: "Produit supprimé" }),
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
