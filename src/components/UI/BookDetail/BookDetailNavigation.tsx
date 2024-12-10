import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const BookDetailNavigation = () => {
  const router = useRouter();
  return <Button onClick={() => router.back()}>목록으로 돌아가기</Button>;
};
