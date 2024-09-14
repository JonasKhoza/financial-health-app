import { Router } from "express";
import {
  createQuiz,
  getQuizData,
  updateQuizData,
} from "../controllers/quiz.controllers";
import { quizValidationRules } from "../utils/validateAuthData";
import verifyUserAuthentication from "../middlewares/verifyUserAuthStatus";

const router = Router();

router.get("/", verifyUserAuthentication, getQuizData);
router.post("/", verifyUserAuthentication, quizValidationRules, createQuiz);
router.put("/", verifyUserAuthentication, quizValidationRules, updateQuizData);

export default router;
