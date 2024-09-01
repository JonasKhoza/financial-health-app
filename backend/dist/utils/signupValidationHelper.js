"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidatorArr = void 0;
const express_validator_1 = require("express-validator");
// Example route with input validation
const signupValidatorArr = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];
exports.signupValidatorArr = signupValidatorArr;
