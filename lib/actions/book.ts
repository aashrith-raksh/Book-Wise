"use server"
import { db } from "@/db";
import { books, borrowRecord } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createBorrowRecord = async ({
  userId,
  bookId,
}: {
  bookId: string;
  userId: string;
}) => {
  const book = await db
    .select({ availableCopies: books.availableCopies })
    .from(books)
    .where(eq(books.id, bookId))
    .limit(1);

  if (!book.length || book[0].availableCopies <= 0) {
    return {
      success: false,
      error: "Book is not available for borrowing",
    };
  }

  const today = new Date();

  let dueDate: string | Date = new Date();
  dueDate.setDate(today.getDate() + 7);
  dueDate = dueDate.toISOString()

  const record = await db.insert(borrowRecord).values({
    userId,
    bookId,
    dueDate,
    status: "BORROWED",
  });

  await db
    .update(books)
    .set({ availableCopies: book[0].availableCopies - 1 })
    .where(eq(books.id, bookId));

  return {
    success: true,
    data: JSON.parse(JSON.stringify(record)),
  };
};
