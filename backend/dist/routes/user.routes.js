"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const contentTypeValidator_1 = __importDefault(require("../middlewares/contentTypeValidator"));
const contentType_1 = require("../utils/contentType");
const validateAuthData_1 = require("../utils/validateAuthData");
const verifyUserAuthStatus_1 = __importDefault(require("../middlewares/verifyUserAuthStatus"));
const router = (0, express_1.Router)();
router.post("/auth/signup", validateAuthData_1.signupValidatorArr, (0, contentTypeValidator_1.default)(contentType_1.applicationJson), users_controllers_1.createUserAccount);
router.post("/auth/signin", validateAuthData_1.signinDataValidatorArr, (0, contentTypeValidator_1.default)(contentType_1.applicationJson), users_controllers_1.signinUser);
router.post("/auth/profile", verifyUserAuthStatus_1.default, // Authentication middleware first
validateAuthData_1.profileDataValidatorArr, // Validation middleware after authentication
(0, contentTypeValidator_1.default)(contentType_1.applicationJson), users_controllers_1.createUserProfile // Final handler
);
exports.default = router;
