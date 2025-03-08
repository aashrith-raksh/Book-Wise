"use server";

import { db } from "@/db";
import { books } from "@/db/schema";
import { BookParams } from "@/types";

export const createBook = async (
  params: BookParams
): Promise<{ success: boolean; data?: BookParams; message?: string }> => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};
