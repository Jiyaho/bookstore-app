import { updateBook } from "@/lib/api/book/api";
import { SubmitBookArgs } from "@/lib/types/BookInterface";
import { useMutation } from "@tanstack/react-query";

export const useUpdateBook = (id: string) => {
  return useMutation({
    mutationFn: async (data: SubmitBookArgs) => {
      const response = await updateBook(id, data);
      return response;
    },
  });
};
