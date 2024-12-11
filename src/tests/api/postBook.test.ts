import { createTestServer } from "@/tests/helpers/testServer";
import { prisma } from "@/lib/prisma";
import { POST } from "@/app/api/books/route";

describe("POST /api/books", () => {
  const request = createTestServer(POST);

  afterEach(async () => {
    await prisma.book.deleteMany();
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request.post("/api/books").send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Missing required fields: title, author, category, publisher, price, stock",
    );
  });

  it("should save the book to the database when valid data is provided", async () => {
    const newBook = {
      title: "Valid Book",
      author: "Author Name",
      category: "Fiction",
      publisher: "Test Publisher",
      price: 1500,
      stock: 5,
      publishedAt: "20241211",
      description: "Test description",
      coverImage: null,
      images: [],
    };

    const response = await request.post("/api/books").send(newBook);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newBook.title);

    const savedBook = await prisma.book.findFirst({
      where: { title: "Valid Book" },
    });
    expect(savedBook).not.toBeNull();
    expect(savedBook?.author).toBe(newBook.author);
  });

  it("should prevent books with the same title, author, and publisher from being added", async () => {
    const book = {
      title: "Duplicate Book",
      author: "Author Name",
      category: "Fiction",
      publisher: "Test Publisher",
      price: 1000,
      stock: 10,
      publishedAt: "20241211",
      description: "Test description",
      coverImage: null,
      images: [],
    };

    await request.post("/api/books").send(book);
    const response = await request.post("/api/books").send(book);

    expect(response.status).toBe(409);
    expect(response.body.error).toBe(
      "A book with the same title, author, and publisher already exists.",
    );
  });

  it("should allow books with the same title, author, but different publishers to be added", async () => {
    const book1 = {
      title: "Shared Title",
      author: "Author One",
      category: "Fiction",
      publisher: "Publisher One",
      price: 1200,
      stock: 8,
      publishedAt: "20241211",
      description: "Test description",
      coverImage: null,
      images: [],
    };

    const book2 = {
      title: "Shared Title",
      author: "Author Two",
      category: "Fiction",
      publisher: "Publisher Two",
      price: 1500,
      stock: 10,
      publishedAt: "20241211",
      description: "Test description",
      coverImage: null,
      images: [],
    };

    const response1 = await request.post("/api/books").send(book1);
    const response2 = await request.post("/api/books").send(book2);

    expect(response1.status).toBe(201);
    expect(response2.status).toBe(201);

    const savedBook1 = await prisma.book.findFirst({
      where: { title: "Shared Title", publisher: "Publisher One" },
    });
    const savedBook2 = await prisma.book.findFirst({
      where: { title: "Shared Title", publisher: "Publisher Two" },
    });

    expect(savedBook1).not.toBeNull();
    expect(savedBook2).not.toBeNull();
  });

  // 가격이나 재고가 음수일 경우 에러 반환하는 테스트
  it("should return 400 if price or stock is negative", async () => {
    const book = {
      title: "Negative Price",
      author: "Author Name",
      category: "Fiction",
      publisher: "Test Publisher",
      price: -1000,
      stock: -5,
    };

    const response = await request.post("/api/books").send(book);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Price and stock must be positive numbers.");
  });
});
