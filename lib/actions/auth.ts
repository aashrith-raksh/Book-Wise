"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { signIn } from "@/lib/auth";
import { triggerWorkflow } from "../workflow-client";

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityNumber, password, universityCard } =
    params;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityNumber,
      password: hashedPassword,
      universityCard,
    });

    const signInResponse = await signInWithCredentials({ email, password });
    triggerWorkflow(email, fullName);

    if (!signInResponse.success) {
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.log("Signup error\n", error);
    return { success: false, error: "Signup error" };
  }
};

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log("Signin error\n", error);
    return { success: false, error: "Signin error" };
  }
};
