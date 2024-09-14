import { Router, Request, Response } from "express";

import {
  createUserAccount,
  createUserProfile,
  signinUser,
} from "../controllers/users.controllers";
import validateContentType from "../middlewares/contentTypeValidator";
import { applicationJson } from "../utils/contentType";
import {
  profileDataValidatorArr,
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
  signinUser
);

router.post(
  "/auth/profile",
  verifyUserAuthentication, // Authentication middleware first
  profileDataValidatorArr, // Validation middleware after authentication
  validateContentType(applicationJson),
  createUserProfile // Final handler
);

export default router;
