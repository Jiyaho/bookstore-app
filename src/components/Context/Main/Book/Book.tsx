import { Book as BookModel } from "@/lib/models/Book.model";
import { useDeleteBook } from "@/hooks/useDeleteBook";
import { BookDescription } from "@/components/UI/Main/Book/BookDescription";
import { BookCoverImage } from "@/components/UI/Main/Book/BookCoverImage";
import { BookActionButtons } from "@/components/UI/Main/Book/BookActionButtons";

interface BookProps {
  book: BookModel;
  handleDeleteBooks?: () => void;
}

export const Book = ({ book }: BookProps) => {
  const { mutate: deleteBookMutation } = useDeleteBook(book.id.toString());
  const handleDeleteBooks = () => {
    deleteBookMutation();
  };

  return (
    <article className="flex justify-between p-4 gap-4 border rounded-lg shadow hover:shadow-lg hover:bg-gray-100 transition cursor-pointer">
      <div className="flex gap-4">
        <div className="w-24 h-36 flex-shrink-0">
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
