import { PageTitle } from "@/components/UI/Common/Title/PageTitle";
import { BookList } from "./Book/BookList";

const MainPage = () => {
  return (
    <>
      <PageTitle title="도서 목록" />
      <BookList />
    </>
  );
};

export default MainPage;
