import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/db";
import { books } from "@/db/schema";
import { auth } from "@/lib/auth";
import { Book } from "@/types";
import { desc } from "drizzle-orm";

const Home = async () => {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;