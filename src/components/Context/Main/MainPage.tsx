import { PageTitle } from "@/components/UI/Common/Title/PageTitle";
import { BookList } from "./Book/BookList";
import { NavigationBar } from "./Navigation/NavigationBar";

const MainPage = () => {
  return (
    <main>
      <NavigationBar />
      <PageTitle title="도서 목록" />
      <BookList />
    </main>
  );
};

export default MainPage;
