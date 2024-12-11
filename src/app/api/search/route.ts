import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // URLSearchParams에서 쿼리 파라미터 추출
  const keyword = searchParams.get("keyword")?.trim() || "";
  const filter = searchParams.get("filter") || "total";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  // 페이지 번호 및 페이지당 항목 수 기본값 처리
  const currentPage = page > 0 ? page : 1;
  const itemsPerPage = limit > 0 ? limit : 10;

  try {
    // 검색 조건 생성
    let whereClause = {};
    if (filter === "total" && keyword) {
      whereClause = {
        OR: [{ title: { contains: keyword } }, { author: { contains: keyword } }],
      };
    } else if (filter === "author" && keyword) {
      whereClause = { author: { contains: keyword } };
    } else if (filter === "title" && keyword) {
      whereClause = { title: { contains: keyword } };
    }

    const books = await prisma.book.findMany({
      where: whereClause,
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.book.count({ where: whereClause });

    if (!books || books.length === 0) {
      console.log("No books found");
      return NextResponse.json(
        { success: false, error: "No books found", data: [], total: 0 },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: books,
      total,
      page: currentPage,
      limit: itemsPerPage,
    });
  } catch (error) {
    console.error("Error in /api/search:", error);
    // 에러 응답 반환
    return NextResponse.json({ success: false, error: "Failed to fetch books" }, { status: 500 });
  }
}
