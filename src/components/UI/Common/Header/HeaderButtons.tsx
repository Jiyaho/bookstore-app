"use client";

import { Button } from "@nextui-org/react";
import { ChevronLeft, House } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const HeaderButtons = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return (
    <div className="flex items-center gap-2">
      <Button isIconOnly variant="light" onClick={() => router.push("/")}>
        <House className="text-gray-500" />
      </Button>
      {!isMainPage && (
        <Button isIconOnly variant="light" onClick={() => router.back()}>
          <ChevronLeft className="text-gray-500" />
        </Button>
      )}
    </div>
  );
};
