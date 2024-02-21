"use server";

import connect from "@/app/lib/utils";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// Create user
export const POST = async (req) => {
  const {
    image,
    username,
    email,
    fullname,
    password,
    phone,
    address,
    male,
    female,
    isAdmin,
    active,
    slug,
  } = await req.json();
  await connect();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    image,
    username,
    email,
    fullname,
    password: hashedPassword,
    phone,
    address,
    male,
    female,
    isAdmin,
    active,
    slug,
  });

  try {
    await newUser.save();
    return new NextResponse(JSON.stringify({ message: "Utilisateur créé" }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Database Error" }), {
      status: 500,
    });
  }
};
