"use client";

import { BookInputForm } from "@/components/UI/Common/Form/BookInputForm";
import { useCreateBook } from "@/hooks/useCreateBook";
import { SubmitBookArgs } from "@/lib/types/BookInterface";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { BookOpen } from "lucide-react";

export const CreateBook = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { mutate: createBook, isPending } = useCreateBook();

  const transformFormData = (formData: FormData): SubmitBookArgs => ({
    title: formData.get("title") as string,
    author: formData.get("author") as string,
    category: formData.get("category") as string,
    publisher: formData.get("publisher") as string,
    publishedAt: formData.get("publishedAt") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    coverImage: null,
    images: [],
  });

  const handleCreateBook = (formData: FormData) => {
    const data = transformFormData(formData);

    createBook(data, {
      onSuccess: () => {
        alert("책이 등록되었습니다!");
        onClose();
      },
      onError: (err: any) => {
        console.error("등록 중 오류 발생:", err);

        // HTTP 상태 코드로 에러 분기 처리
        if (err.response?.status === 409) {
          alert("도서명, 저자명, 출판사가 모두 같아 중복된 책으로 등록이 불가합니다.");
        } else {
          alert("책 등록에 실패했습니다.");
        }
      },
    });
  };

  return (
    <>
      <Button color="primary" onPress={onOpen} size="md" className="rounded-full">
        <BookOpen size={17} />책 등록하기
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">새로운 책 등록하기</ModalHeader>
          <ModalBody>
            <BookInputForm
              onClose={onClose}
              isPending={isPending}
              handleSubmit={handleCreateBook}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
