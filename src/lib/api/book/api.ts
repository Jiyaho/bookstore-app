import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_URL } from "@/lib/api/apiUrls";
import { SubmitBookArgs } from "@/lib/types/BookInterface";

export const getPaginatedBookList = async (page: number, limit: number) => {
  const response = await axiosInstance.get(`${API_URL.BOOK_LIST_URL}?page=${page}&limit=${limit}`);
  return response.data;
};

export const getBookDetail = async (id: string) => {
  const response = await axiosInstance.get(`${API_URL.BOOK_LIST_URL}/${id}`);
  return response.data;
};

export const createBook = async (book: SubmitBookArgs) => {
  const response = await axiosInstance.post(API_URL.BOOK_LIST_URL, book);
  return response.data;
};

export const updateBook = async (id: string, book: SubmitBookArgs) => {
  const response = await axiosInstance.put(`${API_URL.BOOK_LIST_URL}/${id}`, book);
  return response.data;
};

export const deleteBook = async (id: string) => {
  const response = await axiosInstance.delete(`${API_URL.BOOK_LIST_URL}/${id}`);
  return response.data;
};
