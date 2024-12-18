"use client";

import { BookInputForm } from "@/components/UI/Common/Form/BookInputForm";
import { useUpdateBook } from "@/hooks/useUpdateBook";
import { SubmitBookArgs, BookArgs } from "@/lib/types/BookInterface";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { AxiosError } from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface UpdateBookProps {
  initialBookData: BookArgs;
}

export const UpdateBookDetail = ({ initialBookData }: UpdateBookProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { mutate: updateBook, isPending } = useUpdateBook(initialBookData.id.toString());

  const [, setFormData] = useState<SubmitBookArgs>(initialBookData);

  useEffect(() => setFormData(initialBookData), [initialBookData]);

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

  const handleUpdateBook = (formData: FormData) => {
    if (!validateFormData(formData)) return;

    const data = transformFormData(formData);

    updateBook(data, {
      onSuccess: () => {
        alert("책이 수정되었습니다!");
        onClose();
      },
      onError: (err) => {
        console.error("수정 중 오류 발생:", err);

        // HTTP 상태 코드로 에러 분기 처리
        if (err instanceof AxiosError && err.response?.status === 409) {
          alert(
            "이미 등록된 도서로 수정이 불가합니다. (동일한 도서명, 저자명, 출판사가 존재합니다.)",
          );
        } else {
          alert("책 수정에 실패했습니다.");
        }
      },
    });
  };

  return (
    <>
      <Button onPress={onOpen} size="sm" radius="full" className="bg-main-yellow">
        <Pencil size={15} /> 수정하기
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">책 수정하기</ModalHeader>
          <ModalBody>
            <BookInputForm
              onClose={onClose}
              isPending={isPending}
              handleSubmit={handleUpdateBook}
              initialData={initialBookData}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
