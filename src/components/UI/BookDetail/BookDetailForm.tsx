import { Book } from "@/lib/models/Book.model";
import Image from "next/image";
import classNames from "classnames";

interface BookDetailFormProps {
  book: Book;
}

export const BookDetailForm = ({ book }: BookDetailFormProps) => {
  return (
    <div className="bg-white p-10 w-full max-w-6xl mx-auto rounded-lg shadow-lg">
      {/* 책 커버 이미지 및 책 정보 */}
      <div className="flex gap-8 mb-8">
        <div className="flex-shrink-0 w-72">
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-300 flex items-center justify-center text-gray-600 text-xl font-semibold rounded-lg">
              No Cover Image
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
          <h3 className="text-xl text-gray-700 mb-2">{book.author}</h3>
          <p className="text-lg text-gray-600">{book.category}</p>
          <p className="text-lg text-gray-600">{book.publisher}</p>
          <p className="text-lg text-gray-600 mb-4">{book.publishedAt}</p>

          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">{book.getFormattedPrice()}</p>
            <p
              className={classNames("text-lg font-semibold", {
                "text-green-500": book.stock > 0,
                "text-red-500": book.stock <= 0,
              })}
            >
              {book.stock > 0 ? `재고 수량: ${book.stock}` : "품절"}
            </p>
          </div>
        </div>
      </div>

      {/* 책 설명 */}
      <div className="mb-8">
        <h4 className="text-2xl font-semibold mb-2">Description</h4>
        <p className="text-lg text-gray-700 text-justify">{book.description}</p>
      </div>

      {/* 책 이미지 갤러리 */}
      {book.images && book.images.length > 0 && (
        <div className="mb-8">
          <h4 className="text-2xl font-semibold mb-2">Gallery</h4>
          <div className="flex gap-4 overflow-x-auto">
            {book.images.map((image, index) => (
              <div key={index} className="flex-none w-48">
                <img
                  src={image}
                  alt={`image-${index}`}
                  className="w-full h-72 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
