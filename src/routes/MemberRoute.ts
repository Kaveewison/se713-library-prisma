import express from "express";
import * as service from "../services/MemberService";

const router = express.Router();

// GET /members?pageSize=10&pageNo=1&keyword=xxx
router.get("/", async (req, res) => {
  const pageSize = parseInt(req.query.pageSize as string) || 5;
  const pageNo = parseInt(req.query.pageNo as string) || 1;
  const keyword = (req.query.keyword as string) || "";

  try {
    if (pageNo < 1 || pageSize < 1) {
      res.status(400).send("Invalid pageNo or pageSize");
      return;
    }

    const result = await service.getMembersPagination(keyword, pageSize, pageNo);

    if (result.members.length === 0) {
      res.status(404).send("No member found");
      return;
    }

    res.setHeader("x-total-count", result.count.toString());
    res.setHeader("Access-Control-Expose-Headers", "x-total-count");

    res.json(result.members);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    return;
  } finally {
    console.log(
      `Request completed: /members keyword="${keyword}" pageNo=${pageNo} pageSize=${pageSize}`
    );
  }
});

// GET /members/search?name=keyword (old endpoint for backward compatibility)
router.get("/search", async (req, res) => {
  const name = req.query.name as string | undefined;
  if (!name) {
    res.status(400).send("Missing query param: name");
    return;
  }

  res.json(await service.findMembersByName(name));
});

// GET /members/code/:memberCode
router.get("/code/:memberCode", async (req, res) => {
  const memberCode = req.params.memberCode;
  const member = await service.findMemberByCode(memberCode);

  if (!member) {
    res.status(404).send("Member not found");
    return;
  }

  res.json(member);
});

export default router;