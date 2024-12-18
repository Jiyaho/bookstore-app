import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import isValidDate from "@/lib/utils/isValidateDate";

// GET paginated books
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  try {
    const books = await prisma.book.findMany({
      skip: (page - 1) * limit, // 해당 페이지의 첫 데이터 위치
      take: limit, // 페이지당 데이터 개수
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.book.count();

    return NextResponse.json({
      data: books,
      total, // 전체 데이터 개수
      page, // 현재 페이지
      limit, // 페이지당 데이터 수
    });
  } catch (error) {
    console.error("Error fetching paginated books:", error);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

// POST a new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      author,
      category,
      publisher,
      publishedAt,
      description,
      price,
      stock,
      coverImage,
      images = [],
    } = body;

    // 필수 필드 체크
    if (
      !title ||
      !author ||
      !category ||
      !publisher ||
      !price ||
      !stock ||
      !publishedAt ||
      !description
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, author, category, publisher, price, stock, publishedAt, description",
        },
        { status: 400 },
      );
    }

    // 가격과 재고 음수 체크
    if (price < 0 || stock < 0) {
      return NextResponse.json(
        { error: "Price and stock must be positive numbers." },
        { status: 400 },
      );
    }

    // 출판일 유효성 체크 (YYYYMMDD 형식)
    if (!isValidDate(publishedAt)) {
      return NextResponse.json({ error: "Invalid publication date format." }, { status: 400 });
    }

    // 중복 도서 체크
    const existingBook = await prisma.book.findFirst({
      where: {
        title,
        author,
        publisher,
      },
    });

    if (existingBook) {
      return NextResponse.json(
        { error: "A book with the same title, author, and publisher already exists." },
        { status: 409 },
      );
    }

    const imageData = images.length > 0 ? images.map((url: string) => url) : [];

    // 도서 생성
    const createdBook = await prisma.book.create({
      data: {
        title,
        author,
        category,
        publisher,
        publishedAt,
        description,
        price,
        stock,
        coverImage: coverImage || null,
        images: {
          create: imageData,
        },
      },
    });

    if (!createdBook) {
      return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
    }

    return NextResponse.json(createdBook, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
  }
}
