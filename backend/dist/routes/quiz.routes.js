"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controllers_1 = require("../controllers/quiz.controllers");
const validateAuthData_1 = require("../utils/validateAuthData");
const verifyUserAuthStatus_1 = __importDefault(require("../middlewares/verifyUserAuthStatus"));
const router = (0, express_1.Router)();
router.get("/", verifyUserAuthStatus_1.default, quiz_controllers_1.getQuizData);
router.post("/", verifyUserAuthStatus_1.default, validateAuthData_1.quizValidationRules, quiz_controllers_1.createQuiz);
router.put("/", verifyUserAuthStatus_1.default, validateAuthData_1.quizValidationRules, quiz_controllers_1.updateQuizData);
exports.default = router;
