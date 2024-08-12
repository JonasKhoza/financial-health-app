import { Router, Request, Response } from "express";

const router = Router();

router.post("/auth", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: "Successfully hit the endpoint.", data: req.body });
});

router.post("/auth/profile", (req: Request, res: Response) => {
  res.status(200).json({ success: "Profiles path", data: req.body });
});

export default router;
