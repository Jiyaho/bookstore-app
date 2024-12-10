import { PageTitle } from "@/components/UI/Common/Title/PageTitle";
import { SearchResultList } from "./SearchResultList";

const SearchResultPage = () => {
  return (
    <>
      <PageTitle title="검색 결과" />
      <SearchResultList />
    </>
  );
};

export default SearchResultPage;
