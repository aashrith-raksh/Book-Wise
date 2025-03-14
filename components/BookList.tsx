import React from "react";
import BookCard from "@/components/BookCard";
import { Book } from "@/types";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {
  if (books.length < 2) return;

  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books
          .filter((book) => book.availableCopies > 0)
          .map((book) => (
            <BookCard key={book.title} {...book} />
          ))}
      </ul>
    </section>
  );
};
export default BookList;
