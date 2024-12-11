import { deleteBook } from "@/lib/api/book/api";
import { queryClient } from "@/lib/query/queryClient";
import { BOOK_QUERY_KEY } from "@/lib/query/queryKeys";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBook = (id: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await deleteBook(id);
      return response;
    },
    onSuccess: () => {
      alert("삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: [BOOK_QUERY_KEY.BOOK_LIST_KEY] });
    },
  });
};
