import { Book as BookModel } from "@/lib/models/Book.model";
import { useDeleteBook } from "@/hooks/useDeleteBook";
import { BookDescription } from "@/components/UI/Main/Book/BookDescription";
import { BookCoverImage } from "@/components/UI/Common/Book/BookCoverImage";
import { BookActionButtons } from "@/components/UI/Main/Book/BookActionButtons";
import { useRouter } from "next/navigation";

interface BookProps {
  book: BookModel;
  handleDeleteBooks?: () => void;
}

export const Book = ({ book }: BookProps) => {
  const router = useRouter();
  const handleBookClick = () => {
    router.push(`/books/${book.id}`);
  };

  const { mutate: deleteBookMutation } = useDeleteBook(book.id.toString());
  const handleDeleteBooks = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteBookMutation();
    }
  };

  return (
    <article
      className="flex justify-between p-5 gap-4 border rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition cursor-pointer"
      onClick={handleBookClick}
    >
      <div className="flex gap-4">
        <div className="w-24 h-36 flex-shrink-0 relative">
          <BookCoverImage book={book} />
        </div>
        <div className="flex-1">
          <BookDescription book={book} />
        </div>
      </div>
      <div className="flex items-center">
        <BookActionButtons book={book} handleDeleteBooks={handleDeleteBooks} />
      </div>
    </article>
  );
};
