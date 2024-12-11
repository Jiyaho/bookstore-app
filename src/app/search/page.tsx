import { Suspense } from "react";
import SearchResultPage from "@/components/Context/SearchResult/SearchResultPage";

export default function Page() {
  return (
    <Suspense fallback={<div>검색 중...</div>}>
      <SearchResultPage />
    </Suspense>
  );
}
