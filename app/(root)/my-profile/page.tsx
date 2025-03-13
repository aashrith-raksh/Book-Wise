import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { books } from "@/db/schema";
import { signOut } from "@/lib/auth";
import { Book } from "@/types";
import { desc } from "drizzle-orm";
import React from "react";

const MyProfilePage = async () => {

    const latestBooks = (await db
      .select()
      .from(books)
      .limit(10)
      .orderBy(desc(books.createdAt))) as Book[];
  
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button className="mb-5">Logout</Button>
      </form>

      <BookList title="Latest Books" books={latestBooks}/>
    </>
  );
};

export default MyProfilePage;
