import * as repo from "../repository/MemberRepositoryPrisma";

export function findMembersByName(keyword: string) {
  return repo.findMembersByName(keyword);
}

export function findMemberByCode(memberCode: string) {
  return repo.findMemberByCode(memberCode);
}