import { useQuery } from "@tanstack/react-query";
import { BOOK_QUERY_KEY } from "@/lib/query/queryKeys";
import { Book } from "@/lib/models/Book.model";
import { getBookList } from "@/lib/api/book/api";

export const useGetBookList = () => {
  return useQuery<Book[]>({
    queryKey: [BOOK_QUERY_KEY.BOOK_LIST_KEY],
    queryFn: async () => {
      const data = await getBookList();

      return data.map((item: Book) => {
        return new Book(item);
      });
    },
  });
};
