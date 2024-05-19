"use server";

import { createAuthSession, removeAuthSession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, findUserByEmail } from "@/lib/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(prevState, formData) {
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

export async function signIn(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const errors = {};
  const existingUser = findUserByEmail(email);
  if (!existingUser) {
    return {
      errors: {
        email: "Could not authenticate user, please check your credentials.",
      },
    };
  }

  if (!password || !verifyPassword(existingUser.password, password)) {
    return {
      errors: {
        password: "Could not authenticate user, please check your credentials.",
      },
    };
  }

  //create a session and redirect
  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function signOut() {
  await removeAuthSession();
  redirect("/");
}

export async function auth(mode, prevState, formData) {
  if (mode === "login") {
    return signIn(prevState, formData);
  }
  return signUp(prevState, formData);
}
