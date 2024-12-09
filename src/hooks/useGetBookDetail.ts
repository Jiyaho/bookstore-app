import { BOOK_QUERY_KEY } from "@/lib/query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/lib/models/Book.model";
import { getBookDetail } from "@/lib/api/book/api";

export const useGetBookDetail = (id: string) => {
  return useQuery({
    queryKey: [BOOK_QUERY_KEY.BOOK_DETAIL_KEY, id],
    queryFn: async () => {
      const data = await getBookDetail(id);
      return new Book(data);
    },
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });
};
