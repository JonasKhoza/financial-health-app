import { NextFunction, Request, Response } from "express";

function validateContentType(expectedContentType: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const receivedContentType = req.headers["content-type"];
    console.log(expectedContentType);
    if (!receivedContentType?.includes(expectedContentType)) {
      return res.status(415).json({
        success: false,
        error: {
          code: 415,
          message: `Unsupported Media Type: expected ${expectedContentType}`,
        },
      });
    }
    next();
  };
}

export default validateContentType;
