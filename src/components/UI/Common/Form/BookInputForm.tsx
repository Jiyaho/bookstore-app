import { useState, FormEvent } from "react";
import { BookArgs } from "@/lib/types/BookInterface";
import { Form, Input, Textarea, Button } from "@nextui-org/react";
import isValidDate from "@/lib/utils/isValidateDate";

interface BookInputFormProps {
  onClose: () => void;
  isPending: boolean;
  handleSubmit: (formData: FormData) => void;
  initialData?: BookArgs;
}

export const BookInputForm = ({
  onClose,
  isPending,
  handleSubmit: handleFormSubmit,
  initialData,
}: BookInputFormProps) => {
  const [errors, setErrors] = useState({
    price: "",
    stock: "",
    publishedAt: "",
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "price":
      case "stock":
        const num = Number(value);
        if (num < 0) {
          setErrors((prev) => ({
            ...prev,
            [name]: `${name === "price" ? "가격" : "재고"}은 음수일 수 없습니다.`,
          }));
          return false;
        }
        setErrors((prev) => ({ ...prev, [name]: "" }));
        return true;

      case "publishedAt":
        if (!/^\d{8}$/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            publishedAt: "출판일은 8자리 숫자여야 합니다. 예: 20241210",
          }));
          return false;
        }

        // 유효한 날짜인지 확인
        if (!isValidDate(value)) {
          setErrors((prev) => ({
            ...prev,
            publishedAt: "유효한 날짜가 아닙니다. (예: 20241210)",
          }));
          return false;
        }

        setErrors((prev) => ({ ...prev, publishedAt: "" }));
        return true;

      default:
        return true;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // 모든 필드 유효성 검사
    const isValid = ["price", "stock", "publishedAt"].every((field) =>
      validateField(field, formData.get(field) as string),
    );

    if (!isValid) return;
    handleFormSubmit(formData);
  };

  return (
    <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
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
        isInvalid={!!errors.publishedAt}
        errorMessage={errors.publishedAt}
        onValueChange={(value) => validateField("publishedAt", value)}
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
        min="0"
        isRequired
        defaultValue={initialData?.price?.toString() || ""}
        isInvalid={!!errors.price}
        errorMessage={errors.price}
        onValueChange={(value) => validateField("price", value)}
      />
      <Input
        label="재고 수량"
        placeholder="재고 수량을 입력하세요"
        name="stock"
        type="number"
        min="0"
        isRequired
        defaultValue={initialData?.stock?.toString() || ""}
        isInvalid={!!errors.stock}
        errorMessage={errors.stock}
        onValueChange={(value) => validateField("stock", value)}
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
