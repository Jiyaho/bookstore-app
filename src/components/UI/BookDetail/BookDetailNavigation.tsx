import { UpdateBookDetail } from "@/components/Context/BookDetail/UpdateBookDetail";
import { Book } from "@/lib/models/Book.model";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

interface BookDetailNavigationProps {
  book: Book;
}

export const BookDetailNavigation = ({ book }: BookDetailNavigationProps) => {
  const router = useRouter();

  console.log(book);
  return (
    <div className="flex justify-between items-center">
      <Button onClick={() => router.back()}>목록으로 돌아가기</Button>
      <UpdateBookDetail initialBookData={book} />
    </div>
  );
};
