"use client";

import { useGetSearchResult } from "@/hooks/useGetSearchResult";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/UI/Main/Pagination/Pagination";
import { Book } from "../Main/Book/Book";

export const SearchResultList = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || ""; // 기본값은 빈 문자열
  const filter = searchParams.get("filter") || "all"; // 기본값은 "all"
  const initialPage = parseInt(searchParams.get("page") || "1", 10); // 기본값은 1
  const itemsPerPage = parseInt(searchParams.get("limit") || "10", 10); // 기본값은 10

  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, isLoading, error } = useGetSearchResult({
    keyword,
    filter,
    page: currentPage,
    limit: itemsPerPage,
  });

  console.log("검색결과:", data);

  useEffect(() => {
    // URL의 page 값이 변경될 경우, currentPage를 업데이트
    setCurrentPage(initialPage);
  }, [initialPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading search results.</div>;
  if (!data) return <div>검색 결과가 없습니다.</div>;

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
