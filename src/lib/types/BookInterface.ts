export interface BookArgs {
  id: number;
  title: string;
  author: string;
  category: string;
  publisher: string;
  publishedAt: Date;
  description: string;
  price: number;
  stock: number;
  coverImage: string | null;
  images: string[] | [];
  createdAt: Date;
  updatedAt: Date;
}

export interface SubmitBookArgs {
  title: string;
  author: string;
  category: string;
  publisher: string;
  publishedAt: string;
  description: string;
  price: number;
  stock: number;
  coverImage: string | null;
  images: string[] | null;
}
