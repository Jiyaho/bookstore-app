/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Image";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BookImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    CONSTRAINT "BookImage_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "publishedAt" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "coverImage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("author", "category", "coverImage", "createdAt", "description", "id", "price", "publishedAt", "publisher", "stock", "title", "updatedAt") SELECT "author", "category", "coverImage", "createdAt", "description", "id", "price", "publishedAt", "publisher", "stock", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
