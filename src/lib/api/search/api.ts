import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_URL } from "@/lib/api/apiUrls";

interface GetSearchResultByKeywordArgs {
  keyword: string;
  filter: string;
  page: number;
  limit: number;
}

export const getSearchResultByKeyword = async ({
  keyword,
  filter,
  page,
  limit,
}: GetSearchResultByKeywordArgs) => {
  const response = await axiosInstance.get(
    `${API_URL.BOOK_SEARCH_URL}?keyword=${keyword}&filter=${filter}&page=${page}&limit=${limit}`,
  );
  return response.data;
};
