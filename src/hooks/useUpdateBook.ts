import { updateBook } from "@/lib/api/book/api";
import { queryClient } from "@/lib/query/queryClient";
import { BOOK_QUERY_KEY } from "@/lib/query/queryKeys";
import { SubmitBookArgs } from "@/lib/types/BookInterface";
import { useMutation } from "@tanstack/react-query";

export const useUpdateBook = (id: string) => {
  return useMutation({
    mutationFn: async (data: SubmitBookArgs) => {
      const response = await updateBook(id, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOK_QUERY_KEY.BOOK_DETAIL_KEY] });
    },
  });
};
