"use server"
import { eq } from "drizzle-orm";
import { db } from ".";
import { users } from "./schema";

export const isUserAdmin = async (userId?: string) => {
  if (!userId) {
    throw new Error("User ID is required to check admin status.");
  }

  try {
    const isAdmin = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .then((res) => res[0]?.role === "ADMIN");

    return isAdmin;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
