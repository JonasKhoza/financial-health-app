import { body } from "express-validator";

// Example route with input validation
const signupValidatorArr = [
  body("email").trim().isEmail().withMessage("Invalid email address!"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long!"),
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must be alphanurmeric!"),
];

const signinDataValidatorArr = [
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must be alphanurmeric!"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long!"),
];

export { signupValidatorArr, signinDataValidatorArr };
