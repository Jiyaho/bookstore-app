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

  const validateFormData = (formData: FormData): boolean => {
    const publishedAt = formData.get("publishedAt") as string;
    if (!/^\d{8}$/.test(publishedAt)) {
      alert("출판일은 8자리 숫자여야 합니다. 예: 20241210");
      return false;
    }
    return true;
  };

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
    if (!validateFormData(formData)) return;

    const data = transformFormData(formData);

    createBook(data, {
      onSuccess: () => {
        alert("책이 등록되었습니다!");
        onClose();
      },
      onError: (err) => {
        console.error("등록 중 오류 발생:", err);
        alert("책 등록에 실패했습니다.");
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
