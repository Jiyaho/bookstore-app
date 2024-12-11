import { createBook } from "@/lib/api/book/api";
import { queryClient } from "@/lib/query/queryClient";
import { BOOK_QUERY_KEY } from "@/lib/query/queryKeys";
import { SubmitBookArgs } from "@/lib/types/BookInterface";
import { useMutation } from "@tanstack/react-query";

export const useCreateBook = () => {
  return useMutation({
    mutationFn: async (data: SubmitBookArgs) => {
      const response = await createBook(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOK_QUERY_KEY.BOOK_LIST_KEY] });
    },
  });
};
