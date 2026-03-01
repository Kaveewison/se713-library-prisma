import express from "express";
import * as service from "../services/MemberService";

const router = express.Router();

// GET /members?name=keyword
router.get("/", async (req, res) => {
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