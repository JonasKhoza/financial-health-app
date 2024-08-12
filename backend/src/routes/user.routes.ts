import { Router, Request, Response } from "express";

const router = Router();

router.get("/profile", (req: Request, res: Response) => {
  res.status(200).json({ success: "Profiles path" });
});

export default router;
