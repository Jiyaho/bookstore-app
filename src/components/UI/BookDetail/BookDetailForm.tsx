import { Book } from "@/lib/models/Book.model";
import classNames from "classnames";
import { BookCoverImage } from "../Common/Book/BookCoverImage";

interface BookDetailFormProps {
  book: Book;
}

export const BookDetailForm = ({ book }: BookDetailFormProps) => {
  return (
    <div className="bg-white p-10 w-full max-w-6xl mx-auto">
      {/* 책 커버 이미지 및 책 정보 */}
      <div className="flex gap-8 mb-8">
        <div className="w-72 h-[400px] relative">
          <BookCoverImage book={book} />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
          <h3 className="text-xl text-gray-700 mb-2">{book.author}</h3>
          <p className="text-lg text-gray-600">{book.category}</p>
          <p className="text-lg text-gray-600">{book.publisher}</p>
          <p className="text-lg text-gray-600 mb-4">{book.publishedAt}</p>
          <p className="text-xl font-semibold">{book.getFormattedPrice()}</p>
          <p
            className={classNames("text-lg font-semibold pt-2", {
              "text-primary": book.stock > 0,
              "text-red-500": book.stock <= 0,
            })}
          >
            {book.stock > 0 ? `재고 수량: ${book.stock}` : "품절"}
          </p>
        </div>
      </div>

      {/* 책 설명 */}
      <div className="mb-8">
        <h4 className="text-2xl font-semibold mb-2">Description</h4>
        <p className="text-lg text-gray-700 text-justify">{book.description}</p>
      </div>
    </div>
  );
};
