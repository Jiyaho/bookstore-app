"use client";

import { useGetSearchResult } from "@/hooks/useGetSearchResult";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/UI/Main/Pagination/Pagination";
import { Book } from "../Main/Book/Book";
import { AxiosError } from "axios";

export const SearchResultList = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const filter = searchParams.get("filter") || "all";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = parseInt(searchParams.get("limit") || "10", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isNotFound, setIsNotFound] = useState(false);

  const { data, isLoading, error } = useGetSearchResult({
    keyword,
    filter,
    page: currentPage,
    limit: itemsPerPage,
  });

  useEffect(() => {
    setCurrentPage(initialPage);
    setIsNotFound(false);
  }, [initialPage, keyword, filter]);

  if (error instanceof AxiosError && error.response?.status === 404) {
    return <div>검색된 결과가 없습니다.</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (isNotFound || !data || !data.data) return <div>검색된 결과가 없습니다.</div>;

  const { data: searchResults, total } = data;

  return (
    <section className="p-4">
      <div className="text-lg text-main-gray font-semibold mb-4 text-end">
        총 <span className="text-primary font-extrabold text-xl">{total}권</span>의 책이
        검색되었습니다.
      </div>
      <div className="flex flex-col gap-5">
        {searchResults.map((result) => (
          <Book key={result.id} book={result} />
        ))}
      </div>
      <Pagination
        totalItems={total}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};
