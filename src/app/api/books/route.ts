import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all books
export async function GET(request: NextRequest) {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

// POST a book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, author, publisher, publishedAt, description, price, stock, imageUrl } = body;
    if (!title || !author || !price || !stock) {
      return NextResponse.json(
        { error: "Missing required fields: title, author, price, stock" },
        { status: 400 },
      );
    }

    const publishedDate = new Date(publishedAt);
    if (isNaN(publishedDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format for publishedAt" }, { status: 400 });
    }

    const createdBook = await prisma.book.create({
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

    if (!createdBook) {
      return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
    }

    return NextResponse.json(createdBook, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
  }
}
