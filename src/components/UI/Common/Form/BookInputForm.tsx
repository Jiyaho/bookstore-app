import { BookArgs } from "@/lib/types/BookInterface";
import { Form, Input, Textarea, Button } from "@nextui-org/react";

interface BookInputFormProps {
  onClose: () => void;
  isPending: boolean;
  handleSubmit: (formData: FormData) => void;
  initialData?: BookArgs;
}

export const BookInputForm = ({
  onClose,
  isPending,
  handleSubmit,
  initialData,
}: BookInputFormProps) => {
  return (
    <Form
      className="w-full flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
    >
      <Input
        label="제목"
        placeholder="책 제목을 입력하세요"
        name="title"
        isRequired
        defaultValue={initialData?.title || ""}
      />
      <Input
        label="저자"
        placeholder="저자를 입력하세요"
        name="author"
        isRequired
        defaultValue={initialData?.author || ""}
      />
      <Input
        label="카테고리"
        placeholder="카테고리를 입력하세요"
        name="category"
        isRequired
        defaultValue={initialData?.category || ""}
      />
      <Input
        label="출판사"
        placeholder="출판사를 입력하세요"
        name="publisher"
        isRequired
        defaultValue={initialData?.publisher || ""}
      />
      <Input
        label="출판일 (예: 20241210)"
        placeholder="8자리로 연도, 월, 일을 입력하세요"
        name="publishedAt"
        type="number"
        isRequired
        defaultValue={initialData?.publishedAt?.replace(/\D/g, "") || ""}
        maxLength={8}
        errorMessage="출판일은 8자리 숫자여야 합니다. 예: 20241210"
      />
      <Textarea
        label="설명"
        placeholder="책 설명을 입력하세요"
        name="description"
        isRequired
        defaultValue={initialData?.description || ""}
      />
      <Input
        label="가격"
        placeholder="가격을 입력하세요"
        name="price"
        type="number"
        isRequired
        defaultValue={initialData?.price?.toString() || ""}
      />
      <Input
        label="재고 수량"
        placeholder="재고 수량을 입력하세요"
        name="stock"
        type="number"
        isRequired
        defaultValue={initialData?.stock?.toString() || ""}
      />
      <div className="w-full flex justify-end gap-4 pb-4">
        <Button color="danger" variant="flat" type="reset" onPress={() => onClose()}>
          취소
        </Button>
        <Button color="primary" type="submit" isDisabled={isPending}>
          {initialData ? "수정" : "등록"}
        </Button>
      </div>
    </Form>
  );
};
