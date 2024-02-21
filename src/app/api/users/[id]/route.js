
import connect from "@/app/lib/utils";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    // FIND USER BY ID
    const user = await User.findById(id);
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
}; 

export const PUT = async (request, { params }) => { 
  const { id } = params;
  const { username, email, fullname, phone, address, isAdmin, image } =
    await request.json();
  try {
    await connect();
    // FIND USER BY ID AND UPDATE  
     await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        fullname,
        phone,
        address,
        isAdmin,
        image,
      },
      { new: true }
    );
    return new NextResponse(JSON.stringify({ message: "Utilisateur mis à jour" }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({message: "Database Error"}), { status: 500 });
  }
}; 

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    // FIND USER BY ID AND DELETE
    await User.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify({ message: "Utilisateur supprimé" }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({message: "Database Error"}), { status: 500 });
  }
}
