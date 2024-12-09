import { BookArgs } from "../types/BookInterface";

export class Book {
  id: number;
  title: string;
  author: string;
  category: string;
  publisher: string;
  publishedAt: string;
  description: string;
  price: number;
  stock: number;
  coverImage: string | null;
  images: string[] | [];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: BookArgs) {
    this.id = data.id;
    this.title = data.title;
    this.author = data.author;
    this.category = data.category;
    this.publisher = data.publisher;
    this.publishedAt = this.getPublishedAt(data.publishedAt);
    this.description = data.description;
    this.price = data.price;
    this.stock = data.stock;
    this.coverImage = data.coverImage;
    this.images = data.images;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // publishedAt을 포맷팅하여 반환하는 메서드 (YYYYMMDD -> YYYY.MM.DD)
  getPublishedAt(publishedAt: string) {
    return publishedAt.slice(0, 4) + "." + publishedAt.slice(4, 6) + "." + publishedAt.slice(6, 8);
  }
}
