"use server";

import { signIn, signOut } from "../auth";

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    return "Something went wrong. Please try again.";
  }
};

export async function signOutAction() {
  await signOut();
}
