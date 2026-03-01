import * as repo from "../repository/BookRepositoryPrisma";

export function getAllBooks() {
  return repo.getAllBooks();
}

export function searchBooksByTitle(keyword: string) {
  return repo.searchBooksByTitle(keyword);
}

export function getBooksDueOnDate(dateISO: string) {
  return repo.getBooksDueOnDate(dateISO);
}

export function getNotReturnedBooks() {
  return repo.getNotReturnedBooks();
}