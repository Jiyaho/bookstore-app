import { CreateBook } from "./CreateBook";
import { Search } from "./Search";
import { HeaderButtons } from "@/components/UI/Common/Header/HeaderButtons";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-100 shadow-lg py-4 px-8 flex justify-between items-center rounded-b-3xl">
      <HeaderButtons />
      <Search />
      <CreateBook />
    </header>
  );
}
