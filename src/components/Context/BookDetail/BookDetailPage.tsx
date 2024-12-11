"use client";

import { BookDetailForm } from "@/components/UI/BookDetail/BookDetailForm";
import { useGetBookDetail } from "@/hooks/useGetBookDetail";
import { usePathname } from "next/navigation";
import { UpdateBookDetail } from "./UpdateBookDetail";

const BookDetailPage = () => {
  const bookId = usePathname().split("/").pop();
  if (!bookId) return <div>Not Found</div>;

  const { data: book, isLoading } = useGetBookDetail(bookId);
  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>Not Found</div>;

  return (
    <div className="p-4">
      <div className="py-4 flex justify-end">
        <UpdateBookDetail initialBookData={book} />
      </div>
      <BookDetailForm book={book} />
    </div>
  );
};

export default BookDetailPage;
