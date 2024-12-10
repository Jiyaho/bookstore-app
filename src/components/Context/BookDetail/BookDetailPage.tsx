"use client";

import { BookDetailForm } from "@/components/UI/BookDetail/BookDetailForm";
import { BookDetailNavigation } from "@/components/UI/BookDetail/BookDetailNavigation";
import { useGetBookDetail } from "@/hooks/useGetBookDetail";
import { usePathname } from "next/navigation";

const BookDetailPage = () => {
  const bookId = usePathname().split("/").pop();
  if (!bookId) return <div>Not Found</div>;

  const { data: book, isLoading } = useGetBookDetail(bookId);
  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>Not Found</div>;

  return (
    <div className="p-4">
      <BookDetailNavigation />
      <BookDetailForm book={book} />
    </div>
  );
};

export default BookDetailPage;
