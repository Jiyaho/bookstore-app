import { PageTitle } from "@/components/UI/Common/Title/PageTitle";
import { BookList } from "./BookList";
import { SearchBar } from "./SearchBar";

const MainPage = () => {
  return (
    <main>
      <SearchBar />
      <PageTitle title="도서 목록" />
      <BookList />
    </main>
  );
};

export default MainPage;
