"use client";

import { useGetBookList } from "@/hooks/useGetBookList";
import { Book } from "@/components/Context/Main/Book/Book";

export const BookList = () => {
  const { data: bookListData, isLoading, error } = useGetBookList();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books.</div>;

  return (
    <section className="p-4">
      <div className="flex flex-col gap-5">
        {bookListData?.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};
