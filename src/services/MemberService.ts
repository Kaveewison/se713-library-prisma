import * as repo from "../repository/MemberRepositoryPrisma";

export function getMembersPagination(keyword: string, pageSize: number, pageNo: number) {
  return repo.getMembersPagination(keyword, pageSize, pageNo);
}

export function findMembersByName(keyword: string) {
  return repo.findMembersByName(keyword);
}

export function findMemberByCode(memberCode: string) {
  return repo.findMemberByCode(memberCode);
}