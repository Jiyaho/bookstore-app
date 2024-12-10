import { Book as BookModel } from "@/lib/models/Book.model";

interface BookProps {
  book: BookModel;
}

export const BookDescription = ({ book }: BookProps) => {
  return (
    <div className="max-w-lg">
      <h3 className="text-lg font-semibold truncate">{book.title}</h3>
      <p className="text-sm text-gray-600 truncate">{book.author}</p>
      <p className="text-sm text-gray-500 truncate">{book.publisher}</p>
      <p className="text-sm text-gray-500">{book.publishedAt}</p>
      <p className="text-sm text-gray-800 font-semibold mt-2">{book.getFormattedPrice()}</p>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{book.description}</p>
    </div>
  );
};
