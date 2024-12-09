"use client";

import { useCreateBook } from "@/hooks/useCreateBook";
import { SubmitBookArgs } from "@/lib/types/BookInterface";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Form,
} from "@nextui-org/react";

export const CreateBook = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { mutate: createBook, isPending } = useCreateBook();

  const handleCreateBook = (formData: FormData) => {
    const data: SubmitBookArgs = {
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
    };

    if (!/^\d{8}$/.test(data.publishedAt)) {
      alert("출판일은 8자리 숫자여야 합니다. 예: 20241210");
      return;
    }

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
      <Button color="primary" onPress={onOpen} size="sm">
        새로운 책 등록
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">새로운 책 등록하기</ModalHeader>
            <ModalBody>
              <BookInputForm
                onClose={onClose}
                isPending={isPending}
                handleCreateBook={handleCreateBook}
              />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

interface BookInputFormProps {
  onClose: () => void;
  isPending: boolean;
  handleCreateBook: (formData: FormData) => void;
}

const BookInputForm = ({ onClose, isPending, handleCreateBook }: BookInputFormProps) => {
  return (
    <Form
      className="w-full flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleCreateBook(formData);
      }}
    >
      <Input label="제목" placeholder="책 제목을 입력하세요" name="title" isRequired />
      <Input label="저자" placeholder="저자를 입력하세요" name="author" isRequired />
      <Input label="카테고리" placeholder="카테고리를 입력하세요" name="category" isRequired />
      <Input label="출판사" placeholder="출판사를 입력하세요" name="publisher" isRequired />
      <Input
        label="출판일 (예: 20241210)"
        placeholder="8자리로 연도, 월, 일을 입력하세요"
        name="publishedAt"
        type="number"
        isRequired
      />
      <Textarea label="설명" placeholder="책 설명을 입력하세요" name="description" isRequired />
      <Input label="가격" placeholder="가격을 입력하세요" name="price" type="number" isRequired />
      <Input
        label="재고 수량"
        placeholder="재고 수량을 입력하세요"
        name="stock"
        type="number"
        isRequired
      />
      <div className="w-full flex justify-end gap-4 pb-4">
        <Button color="danger" variant="flat" type="reset" onPress={() => onClose()}>
          취소
        </Button>
        <Button color="primary" type="submit" isDisabled={isPending}>
          등록
        </Button>
      </div>
    </Form>
  );
};
