import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { signOut } from "@/lib/auth";
import React from "react";

const MyProfilePage = () => {
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

      <BookList title="Borrowed Books" books={sampleBooks}/>
    </>
  );
};

export default MyProfilePage;
