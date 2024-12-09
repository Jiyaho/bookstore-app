import { useQuery } from "@tanstack/react-query";
import { BOOK_QUERY_KEY } from "@/lib/query/queryKeys";
import { Book } from "@/lib/models/Book.model";
import { getBookList } from "@/lib/api/book/api";
import { BookArgs } from "@/lib/types/BookInterface";

export const useGetBookList = () => {
  return useQuery({
    queryKey: [BOOK_QUERY_KEY.BOOK_LIST_KEY],
    queryFn: async () => {
      const data = await getBookList();

      return data.map((item: BookArgs) => {
        return new Book(item);
      });
    },
  });
};
