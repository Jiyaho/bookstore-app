import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET a book by id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });
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
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { title, author, publisher, publishedAt, description, price, stock, imageUrl } = body;

    const publishedDate = new Date(publishedAt);
    if (isNaN(publishedDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format for publishedAt" }, { status: 400 });
    }

    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        publisher,
        publishedAt: publishedDate,
        description,
        price,
        stock,
        imageUrl: imageUrl || null,
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
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const deletedBook = await prisma.book.delete({ where: { id: parseInt(id) } });
    if (!deletedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Book deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
  }
}
