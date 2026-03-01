import type { Book, Author } from "@prisma/client";

export interface BookWithAuthor extends Book {
  author: Author;
}

export interface PageBook {
  count: number;
  books: BookWithAuthor[];
}