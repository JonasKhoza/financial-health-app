"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateUserToken(userData) {
    console.log(process.env.ACCESS_TOKEN_KEY);
    // Generate access token (short-lived)
    const accessToken = jsonwebtoken_1.default.sign(userData, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "15m", // Access token valid for 15 minutes
    });
    // Generate refresh token (longer-lived)
    const refreshToken = jsonwebtoken_1.default.sign(userData, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: "7d", // Refresh token valid for 7 days
    });
    return { accessToken, refreshToken };
}
exports.default = generateUserToken;
