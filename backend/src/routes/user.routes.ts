import { Router, Request, Response } from "express";

import {
  createUserAccount,
  createUserProfile,
  signinUserUser,
} from "../controllers/users.controllers";
import validateContentType from "../middlewares/contentTypeValidator";
import { applicationJson } from "../utils/contentType";
import {
  signinDataValidatorArr,
  signupValidatorArr,
} from "../utils/validateAuthData";
import verifyUserAuthentication from "../middlewares/verifyUserAuthStatus";

const router = Router();

router.post(
  "/auth/signup",
  signupValidatorArr,
  validateContentType(applicationJson),
  createUserAccount
);

router.post(
  "/auth/signin",
  signinDataValidatorArr,
  validateContentType(applicationJson),
  signinUserUser
);

router.post("/auth/profile", verifyUserAuthentication, createUserProfile);

export default router;
