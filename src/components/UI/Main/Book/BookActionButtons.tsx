import { Button } from "@nextui-org/react";
import { Book as BookModel } from "@/lib/models/Book.model";

interface BookProps {
  book: BookModel;
  handleDeleteBooks?: () => void;
}

export const BookActionButtons = ({ book, handleDeleteBooks }: BookProps) => {
  return (
    <Button
      color="danger"
      variant="flat"
      size="sm"
      onClick={handleDeleteBooks}
      disabled={!book}
      className="cursor-pointer text-sm"
    >
      삭제
    </Button>
  );
};
