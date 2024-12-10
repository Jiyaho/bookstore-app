import { Book as BookModel } from "@/lib/models/Book.model";
import Image from "next/image";

interface BookProps {
  book: BookModel;
}

export const BookCoverImage = ({ book }: BookProps) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={book.coverImage || "/assets/default-cover-image.png"}
        alt={`${book.title} cover`}
        fill
        className="rounded-lg object-cover"
        loading="lazy"
      />
    </div>
  );
};
