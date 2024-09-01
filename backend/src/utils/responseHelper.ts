import { Response } from "express";

import { CustomError, ResponseStructure } from "../models/response.model";

export default function responseHelper(res: Response, err: any) {
  if (err instanceof CustomError) {
    const error = {
      code: err.code,
      message: err.message,
    };

    res.status(err.code).json(new ResponseStructure(false, null, null, error));
  }
}
