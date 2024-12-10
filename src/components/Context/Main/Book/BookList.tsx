"use client";

import { useState } from "react";
import { useGetPaginatedBooks } from "@/hooks/useGetBookList";
import { Book } from "@/components/Context/Main/Book/Book";
import { Pagination } from "@/components/UI/Main/Pagination/Pagination";

export const BookList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, error } = useGetPaginatedBooks(currentPage, itemsPerPage);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books.</div>;
  if (!data) return <div>등록된 책이 없습니다.</div>;

  const { data: books, total } = data;

  return (
    <section className="p-4">
      <div className="text-lg text-main-gray font-semibold mb-4 text-end">
        총 <span className="text-primary text-xl font-extrabold">{total}권</span>의 책이 있습니다.
      </div>
      <div className="flex flex-col gap-5">
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
      <Pagination
        totalItems={total}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};
