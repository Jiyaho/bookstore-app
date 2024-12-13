import { createTestServer } from "@/tests/helpers/testServer";
import { prisma } from "@/lib/prisma";
import { PUT } from "@/app/api/books/[id]/route";

describe("PUT /api/books/:id", () => {
  const request = createTestServer(PUT);

  let bookId: string;

  beforeEach(async () => {
    const book = await prisma.book.create({
      data: {
        title: "Original Title",
        author: "Original Author",
        category: "Fiction",
        publisher: "Test Publisher",
        publishedAt: "20241211",
        description: "Test description",
        price: 1500,
        stock: 10,
        coverImage: null,
      },
    });
    bookId = book.id;
  });

  afterEach(async () => {
    await prisma.book.deleteMany();
  });

  it("should update book details successfully", async () => {
    const updatedData = {
      title: "Updated Title",
      author: "Original Author",
      category: "Fiction",
      publisher: "Test Publisher",
      publishedAt: "20241211",
      description: "Updated description",
      price: 2000,
      stock: 15,
      coverImage: null,
      images: [],
    };

    const response = await request.put(`/api/books/${bookId}`).send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Title");
    expect(response.body.price).toBe(2000);
    expect(response.body.stock).toBe(15);
  });

  it("should return 400 if required fields are missing", async () => {
    const incompleteData = {
      title: "Updated Title",
    };

    const response = await request.put(`/api/books/${bookId}`).send(incompleteData);

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("Missing required fields");
  });

  it("should return 400 if price or stock is negative", async () => {
    const invalidData = {
      title: "Updated Title",
      author: "Original Author",
      category: "Fiction",
      publisher: "Test Publisher",
      publishedAt: "20241211",
      description: "Updated description",
      price: -100,
      stock: -5,
      coverImage: null,
      images: [],
    };

    const response = await request.put(`/api/books/${bookId}`).send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Price and stock must be positive numbers.");
  });

  it("should return 409 if a book with the same title, author, and publisher already exists", async () => {
    await prisma.book.create({
      data: {
        title: "Duplicate Title",
        author: "Original Author",
        category: "Non-Fiction",
        publisher: "Test Publisher",
        publishedAt: "20241211",
        description: "Duplicate description",
        price: 1500,
        stock: 5,
        coverImage: null,
      },
    });

    const duplicateData = {
      title: "Duplicate Title",
      author: "Original Author",
      category: "Fiction",
      publisher: "Test Publisher",
      publishedAt: "20241211",
      description: "Updated description",
      price: 1500,
      stock: 10,
      coverImage: null,
      images: [],
    };

    const response = await request.put(`/api/books/${bookId}`).send(duplicateData);

    expect(response.status).toBe(409);
    expect(response.body.error).toBe(
      "A book with the same title, author, and publisher already exists.",
    );
  });

  it("should return 404 if the book ID does not exist", async () => {
    const nonExistentId = "non-existent-id";
    const updatedData = {
      title: "Updated Title",
      author: "Original Author",
      category: "Fiction",
      publisher: "Test Publisher",
      publishedAt: "20241211",
      description: "Updated description",
      price: 2000,
      stock: 15,
      coverImage: null,
      images: [],
    };

    const response = await request.put(`/api/books/${nonExistentId}`).send(updatedData);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Book not found.");
  });
});
