import { getPaginatedBookList } from "@/lib/api/book/api";
import { Book } from "@/lib/models/Book.model";
import { BOOK_QUERY_KEY } from "@/lib/query/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetPaginatedBooks = (page: number, limit: number) => {
  return useQuery<{ data: Book[]; total: number }>({
    queryKey: [BOOK_QUERY_KEY.BOOK_LIST_KEY, page, limit],
    queryFn: async () => {
      const data = await getPaginatedBookList(page, limit);
      return {
        data: data.data.map((item: Book) => new Book(item)),
        total: data.total,
      };
    },
    staleTime: 5000,
    gcTime: 100000,
  });
};
