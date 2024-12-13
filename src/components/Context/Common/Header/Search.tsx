"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const options = [
  { key: "total", label: "전체" },
  { key: "title", label: "도서명" },
  { key: "author", label: "저자명" },
];

export const Search = () => {
  const [searchFilter, setSearchFilter] = useState("total");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert("검색어를 입력하세요.");
      return;
    }

    const query = new URLSearchParams({
      keyword: searchTerm,
      filter: searchFilter,
      page: "1",
      limit: "10",
    });

    router.push(`/search?${query.toString()}`);
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-3 w-[450px] h-14 items-center justify-center">
      <Select
        label="검색 필터"
        variant="underlined"
        className="w-1/4 h-full flex-shrink-0"
        defaultSelectedKeys={["total"]}
        size="sm"
        onChange={(e) => setSearchFilter(e.target.value)}
      >
        {options.map((option) => (
          <SelectItem key={option.key} value={option.key}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="w-2/4 flex-shrink-0" // 크기 고정
        variant="underlined"
      />
      <Button
        size="sm"
        isIconOnly
        variant="light"
        type="submit"
        isDisabled={!searchTerm}
        className="flex-shrink-0" // 크기 고정
      >
        <SearchIcon className="text-gray-600" />
      </Button>
    </form>
  );
};
