"use server";

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import createUser from "@/lib/user";
import { redirect } from "next/navigation";

export default async function signUp(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const errors = {};
  if (email.trim().length < 0 || !email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }
  if (password.trim().length < 8) {
    errors.password = "Password should contain atleast 8 characters";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }
  //encrypt the password
  const encryptedPassword = hashUserPassword(password);

  //store the user in DB, create a session and redirect
  try {
    const userId = createUser(email, encryptedPassword);
    await createAuthSession(userId);
    redirect("/training");
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email:
            "It seems like an account for the chosen email already exists.",
        },
      };
    }
    throw error;
  }
}
