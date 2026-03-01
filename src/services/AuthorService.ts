import * as repo from "../repository/AuthorRepositoryPrisma";

export function getAllAuthors() {
  return repo.getAllAuthors();
}