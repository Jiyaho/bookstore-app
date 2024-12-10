import { Pagination as NextUIPagination } from "@nextui-org/react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-4">
      <NextUIPagination
        total={totalPages}
        initialPage={1}
        page={currentPage}
        onChange={onPageChange}
        variant="light"
        radius="full"
        color="default"
        showControls
      />
    </div>
  );
};
