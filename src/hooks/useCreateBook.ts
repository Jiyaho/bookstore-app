import { createBook } from "@/lib/api/book/api";
import { SubmitBookArgs } from "@/lib/types/BookInterface";
import { useMutation } from "@tanstack/react-query";

export const useCreateBook = () => {
  return useMutation({
    mutationFn: async (data: SubmitBookArgs) => {
      const response = await createBook(data);
      return response;
    },
  });
};
