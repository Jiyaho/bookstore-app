import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET a book by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}

// PUT a book by id
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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
      images,
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

    // 책이 존재하는지 확인 (책이 없으면 404 Not Found)
    const existingBook = await prisma.book.findUnique({ where: { id } });
    if (!existingBook) {
      return NextResponse.json({ error: "Book not found." }, { status: 404 });
    }

    // 중복 도서 체크: 동일한 title, author, publisher의 책이 다른 ID로 존재하는 경우
    const duplicateBook = await prisma.book.findFirst({
      where: {
        title,
        author,
        publisher,
        NOT: { id }, // 현재 수정하려는 책 제외
      },
    });

    if (duplicateBook) {
      return NextResponse.json(
        { error: "A book with the same title, author, and publisher already exists." },
        { status: 409 },
      );
    }

    // 가격과 재고 음수 체크
    if (price < 0 || stock < 0) {
      return NextResponse.json(
        { error: "Price and stock must be positive numbers." },
        { status: 400 },
      );
    }

    // 데이터 업데이트
    const updatedBook = await prisma.book.update({
      where: { id },
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
          set: images && images.length > 0 ? images.map((url: string) => ({ url })) : [],
        },
      },
    });

    if (!updatedBook) {
      return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
    }

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
  }
}

// DELETE a book by id
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    // 먼저 책이 존재하는지 확인
    const existingBook = await prisma.book.findUnique({ where: { id } });
    if (!existingBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // 책이 존재하면 삭제 수행
    await prisma.book.delete({ where: { id } });

    return NextResponse.json({ message: "Book deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
  }
}
