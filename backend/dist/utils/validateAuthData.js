"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizValidationRules = exports.profileDataValidatorArr = exports.signinDataValidatorArr = exports.signupValidatorArr = void 0;
const express_validator_1 = require("express-validator");
// Example route with input validation
const signupValidatorArr = [
    (0, express_validator_1.body)("email").trim().isEmail().withMessage("Invalid email address!"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long!"),
    (0, express_validator_1.body)("username")
        .trim()
        .notEmpty()
        .isAlphanumeric()
        .withMessage("Username must be alphanurmeric!"),
];
exports.signupValidatorArr = signupValidatorArr;
const signinDataValidatorArr = [
    (0, express_validator_1.body)("username")
        .trim()
        .notEmpty()
        .isAlphanumeric()
        .withMessage("Username must be alphanurmeric!"),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long!"),
];
exports.signinDataValidatorArr = signinDataValidatorArr;
const profileDataValidatorArr = [
    (0, express_validator_1.body)("salutation").trim().notEmpty().withMessage("Choose salutation!"),
    (0, express_validator_1.body)("firstName").trim().notEmpty().withMessage("Please provide first name!"),
    (0, express_validator_1.body)("lastName").trim().notEmpty().withMessage("Please provide last name!"),
    (0, express_validator_1.body)("phone")
        .trim() // removes leading and trailing spaces
        .notEmpty()
        .custom((value) => {
        const cleanedValue = value.replace(/\s/g, ""); // Remove internal spaces
        if (!/^\d+$/.test(cleanedValue)) {
            throw new Error("Please provide a valid phone number!");
        }
        return true;
    }),
];
exports.profileDataValidatorArr = profileDataValidatorArr;
const quizValidationRules = [
    // Validate that quiz exists
    (0, express_validator_1.body)("quiz").exists().withMessage("Quiz object is required"),
    // Validate each question inside quiz
    (0, express_validator_1.body)("quiz.1")
        .isString()
        .notEmpty()
        .withMessage("Question 1 is required and must be a string"),
    (0, express_validator_1.body)("quiz.2")
        .isString()
        .notEmpty()
        .withMessage("Question 2 is required and must be a string"),
    (0, express_validator_1.body)("quiz.3")
        .isString()
        .notEmpty()
        .withMessage("Question 3 is required and must be a string"),
    // Validate that question 4, 6, 7, 8, 9, 13, and 14 are numeric
    (0, express_validator_1.body)("quiz.4").isNumeric().withMessage("Question 4 must be a number"),
    (0, express_validator_1.body)("quiz.6").isNumeric().withMessage("Question 6 must be a number"),
    (0, express_validator_1.body)("quiz.7").isNumeric().withMessage("Question 7 must be a number"),
    (0, express_validator_1.body)("quiz.8").isNumeric().withMessage("Question 8 must be a number"),
    (0, express_validator_1.body)("quiz.9").isNumeric().withMessage("Question 9 must be a number"),
    (0, express_validator_1.body)("quiz.13").isNumeric().withMessage("Question 13 must be a number"),
    (0, express_validator_1.body)("quiz.14").isNumeric().withMessage("Question 14 must be a number"),
    // Validate that other fields are strings
    (0, express_validator_1.body)("quiz.5")
        .isString()
        .notEmpty()
        .withMessage("Question 5 is required and must be a string"),
    (0, express_validator_1.body)("quiz.10")
        .isString()
        .notEmpty()
        .withMessage("Question 10 is required and must be a string"),
    (0, express_validator_1.body)("quiz.11")
        .isString()
        .notEmpty()
        .withMessage("Question 11 is required and must be a string"),
    (0, express_validator_1.body)("quiz.12")
        .isString()
        .notEmpty()
        .withMessage("Question 12 is required and must be a string"),
    (0, express_validator_1.body)("quiz.15")
        .isString()
        .notEmpty()
        .withMessage("Question 15 is required and must be a string"),
    (0, express_validator_1.body)("quiz.16")
        .isString()
        .notEmpty()
        .withMessage("Question 16 is required and must be a string"),
];
exports.quizValidationRules = quizValidationRules;
