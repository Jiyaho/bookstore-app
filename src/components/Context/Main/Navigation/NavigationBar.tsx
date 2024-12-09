import { CreateBook } from "./CreateBook";
import { Search } from "./Search";

export const NavigationBar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <Search />
      <CreateBook />
    </div>
  );
};
