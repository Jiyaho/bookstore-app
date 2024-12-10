"use client";

import { useUpdateBook } from "@/hooks/useUpdateBook";
import { SubmitBookArgs, BookArgs } from "@/lib/types/BookInterface";
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
import { useState, useEffect } from "react";

interface UpdateBookProps {
  initialBookData: BookArgs;
}

export const UpdateBookDetail = ({ initialBookData }: UpdateBookProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { mutate: updateBook, isPending } = useUpdateBook(initialBookData.id.toString());

  const [formData, setFormData] = useState<SubmitBookArgs>(initialBookData);

  useEffect(() => {
    // initialBookData가 변경되면 폼 데이터 업데이트
    setFormData(initialBookData);
  }, [initialBookData]);

  const handleUpdateBook = (formData: FormData) => {
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

    if (isNaN(data.price) || isNaN(data.stock)) {
      alert("가격과 재고는 유효한 숫자여야 합니다.");
      return;
    }

    if (!/^\d{8}$/.test(data.publishedAt)) {
      alert("출판일은 8자리 숫자여야 합니다. 예: 20241210");
      return;
    }

    updateBook(data, {
      onSuccess: () => {
        alert("책이 수정되었습니다!");
        onClose();
      },
      onError: (err) => {
        console.error("수정 중 오류 발생:", err);
        alert("책 수정에 실패했습니다.");
      },
    });
  };

  return (
    <>
      <Button color="primary" onPress={onOpen} size="sm">
        책 수정
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">책 수정하기</ModalHeader>
            <ModalBody>
              <BookInputForm
                onClose={onClose}
                isPending={isPending}
                handleCreateBook={handleUpdateBook}
                initialData={formData}
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
  initialData: SubmitBookArgs;
}

const BookInputForm = ({
  onClose,
  isPending,
  handleCreateBook,
  initialData,
}: BookInputFormProps) => {
  return (
    <Form
      className="w-full flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleCreateBook(formData);
      }}
    >
      <Input
        label="제목"
        placeholder="책 제목을 입력하세요"
        name="title"
        isRequired
        defaultValue={initialData.title}
      />
      <Input
        label="저자"
        placeholder="저자를 입력하세요"
        name="author"
        isRequired
        defaultValue={initialData.author}
      />
      <Input
        label="카테고리"
        placeholder="카테고리를 입력하세요"
        name="category"
        isRequired
        defaultValue={initialData.category}
      />
      <Input
        label="출판사"
        placeholder="출판사를 입력하세요"
        name="publisher"
        isRequired
        defaultValue={initialData.publisher}
      />
      <Input
        label="출판일 (예: 20241210)"
        placeholder="8자리로 연도, 월, 일을 입력하세요"
        name="publishedAt"
        type="number"
        isRequired
        defaultValue={initialData.publishedAt.replace(/\D/g, "")}
      />
      <Textarea
        label="설명"
        placeholder="책 설명을 입력하세요"
        name="description"
        isRequired
        defaultValue={initialData.description}
      />
      <Input
        label="가격"
        placeholder="가격을 입력하세요"
        name="price"
        type="number"
        isRequired
        defaultValue={initialData.price.toString()}
      />
      <Input
        label="재고 수량"
        placeholder="재고 수량을 입력하세요"
        name="stock"
        type="number"
        isRequired
        defaultValue={initialData.stock.toString()}
      />
      <div className="w-full flex justify-end gap-4 pb-4">
        <Button color="danger" variant="flat" type="reset" onPress={() => onClose()}>
          취소
        </Button>
        <Button color="primary" type="submit" isDisabled={isPending}>
          수정
        </Button>
      </div>
    </Form>
  );
};

// "use client";

// import { useUpdateBook } from "@/hooks/useUpdateBook";
// import { SubmitBookArgs, BookArgs } from "@/lib/types/BookInterface";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   Button,
//   useDisclosure,
//   Input,
//   Textarea,
//   Form,
// } from "@nextui-org/react";
// import { useState, useEffect } from "react";

// interface UpdateBookProps {
//   initialBookData: BookArgs;
// }

// export const UpdateBookDetail = ({ initialBookData }: UpdateBookProps) => {
//   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
//   const { mutate: updateBook, isPending } = useUpdateBook(initialBookData.id.toString());

//   const [formData, setFormData] = useState<SubmitBookArgs>(initialBookData);

//   useEffect(() => {
//     // initialBookData가 변경되면 폼 데이터 업데이트
//     setFormData(initialBookData);
//   }, [initialBookData]);

//   const handleUpdateBook = (formData: FormData) => {
//     const title = formData.get("title") as string;
//     const author = formData.get("author") as string;
//     const category = formData.get("category") as string;
//     const publisher = formData.get("publisher") as string;
//     const publishedAt = formData.get("publishedAt") as string;
//     const description = formData.get("description") as string;

//     // price와 stock을 숫자로 변환 후 검증
//     const price = Number(formData.get("price"));
//     const stock = Number(formData.get("stock"));

//     // 숫자가 아닌 값이 들어오면 알림
//     if (isNaN(price) || isNaN(stock)) {
//       alert("가격과 재고는 유효한 숫자여야 합니다.");
//       return;
//     }

//     const data: SubmitBookArgs = {
//       title,
//       author,
//       category,
//       publisher,
//       publishedAt,
//       description,
//       price,
//       stock,
//       coverImage: null, // 수정 시에도 커버 이미지 변경을 고려할 수 있음
//       images: [],
//     };
//     if (!/^\d{8}$/.test(data.publishedAt)) {
//       alert("출판일은 8자리 숫자여야 합니다. 예: 20241210");
//       return;
//     }

//     updateBook(data, {
//       onSuccess: () => {
//         alert("책이 수정되었습니다!");
//         onClose();
//       },
//       onError: (err) => {
//         console.error("수정 중 오류 발생:", err);
//         alert("책 수정에 실패했습니다.");
//       },
//     });
//   };

//   return (
//     <>
//       <Button color="primary" onPress={onOpen} size="sm">
//         책 수정
//       </Button>
//       <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} size="xl">
//         <ModalContent>
//           <>
//             <ModalHeader className="flex flex-col gap-1">책 수정하기</ModalHeader>
//             <ModalBody>
//               <BookInputForm
//                 onClose={onClose}
//                 isPending={isPending}
//                 handleCreateBook={handleUpdateBook}
//                 initialData={formData}
//               />
//             </ModalBody>
//           </>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// interface BookInputFormProps {
//   onClose: () => void;
//   isPending: boolean;
//   handleCreateBook: (formData: FormData) => void;
//   initialData: SubmitBookArgs;
// }

// const BookInputForm = ({
//   onClose,
//   isPending,
//   handleCreateBook,
//   initialData,
// }: BookInputFormProps) => {
//   return (
//     <Form
//       className="w-full flex flex-col gap-4"
//       onSubmit={(e) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         handleCreateBook(formData);
//       }}
//     >
//       <Input
//         label="제목"
//         placeholder="책 제목을 입력하세요"
//         name="title"
//         isRequired
//         defaultValue={initialData.title}
//       />
//       <Input
//         label="저자"
//         placeholder="저자를 입력하세요"
//         name="author"
//         isRequired
//         defaultValue={initialData.author}
//       />
//       <Input
//         label="카테고리"
//         placeholder="카테고리를 입력하세요"
//         name="category"
//         isRequired
//         defaultValue={initialData.category}
//       />
//       <Input
//         label="출판사"
//         placeholder="출판사를 입력하세요"
//         name="publisher"
//         isRequired
//         defaultValue={initialData.publisher}
//       />
//       <Input
//         label="출판일 (예: 20241210)"
//         placeholder="8자리로 연도, 월, 일을 입력하세요"
//         name="publishedAt"
//         type="number"
//         isRequired
//         defaultValue={initialData.publishedAt.replace(/\D/g, "")}
//       />
//       <Textarea
//         label="설명"
//         placeholder="책 설명을 입력하세요"
//         name="description"
//         isRequired
//         defaultValue={initialData.description}
//       />
//       <Input
//         label="가격"
//         placeholder="가격을 입력하세요"
//         name="price"
//         type="number"
//         isRequired
//         defaultValue={initialData.price.toString()}
//       />
//       <Input
//         label="재고 수량"
//         placeholder="재고 수량을 입력하세요"
//         name="stock"
//         type="number"
//         isRequired
//         defaultValue={initialData.stock.toString()}
//       />
//       <div className="w-full flex justify-end gap-4 pb-4">
//         <Button color="danger" variant="flat" type="reset" onPress={() => onClose()}>
//           취소
//         </Button>
//         <Button color="primary" type="submit" isDisabled={isPending}>
//           수정
//         </Button>
//       </div>
//     </Form>
//   );
// };
