import { useQuery } from "@tanstack/react-query";
import { getSearchResultByKeyword } from "@/lib/api/search/api";
import { SEARCH_QUERY_KEY } from "@/lib/query/queryKeys";
import { Book } from "@/lib/models/Book.model";

interface UseGetSearchResultProps {
  keyword: string;
  filter: string;
  page: number;
  limit: number;
}

export const useGetSearchResult = ({ keyword, filter, page, limit }: UseGetSearchResultProps) => {
  return useQuery<{ data: Book[]; total: number }>({
    queryKey: [SEARCH_QUERY_KEY.SEARCH_RESULT_KEY, keyword, filter, page, limit],
    queryFn: async () => {
      const data = await getSearchResultByKeyword({ keyword, filter, page, limit });

      return {
        data: data.data.map((item: Book) => new Book(item)),
        total: data.total,
      };
    },
    staleTime: 5000,
    gcTime: 100000,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });
};
