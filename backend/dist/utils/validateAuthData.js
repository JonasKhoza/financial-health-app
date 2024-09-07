"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinDataValidatorArr = exports.signupValidatorArr = void 0;
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
        .isAlphanumeric()
        .withMessage("Username must be alphanurmeric!"),
];
exports.signupValidatorArr = signupValidatorArr;
const signinDataValidatorArr = [
    (0, express_validator_1.body)("username")
        .trim()
        .isAlphanumeric()
        .withMessage("Username must be alphanurmeric!"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long!"),
];
exports.signinDataValidatorArr = signinDataValidatorArr;
