import { createTestServer } from "@/tests/helpers/testServer";
import { prisma } from "@/lib/prisma";
import { DELETE } from "@/app/api/books/[id]/route";

describe("DELETE /api/books/:id", () => {
  const request = createTestServer(DELETE);

  let bookId: string;

  beforeEach(async () => {
    const book = await prisma.book.create({
      data: {
        title: "Test Book",
        author: "Test Author",
        category: "Test Category",
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

  it("should delete book successfully", async () => {
    const response = await request.delete(`/api/books/${bookId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book deleted successfully");
  });

  it("should return 404 if book not found", async () => {
    const nonExistentId = "non-existent-id";
    const response = await request.delete(`/api/books/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Book not found");
  });
});
