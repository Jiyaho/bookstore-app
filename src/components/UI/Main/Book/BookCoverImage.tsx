import { Book as BookModel } from "@/lib/models/Book.model";
import Image from "next/image";

interface BookProps {
  book: BookModel;
}

export const BookCoverImage = ({ book }: BookProps) => {
  return (
    <>
      {book.coverImage ? (
        <Image
          src={book.coverImage || ""}
          alt={`${book.title} cover`}
          fill
          className="rounded-lg object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm rounded-lg">
          No Image
        </div>
      )}
    </>
  );
};
