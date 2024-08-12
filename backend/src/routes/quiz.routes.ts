import { Request, Response, Router } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: "Successfully posted quiz",
    data: req.body,
  });
});

export default router;
