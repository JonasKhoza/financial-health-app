"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_model_1 = require("../models/response.model");
const responseHelper_1 = __importDefault(require("../utils/responseHelper"));
function verifyUserAuthentication(req, res, next) {
    var _a, _b;
    const accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
    const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken;
    try {
        if (!accessToken && !refreshToken) {
            throw new response_model_1.CustomError("Unauthorized user. Please sign in!", 401);
        }
        // Verify Access Token
        if (accessToken) {
            jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err) => {
                if (err) {
                    // Access Token is invalid or expired, fallback to refresh token
                    return handleRefreshToken(req, res, next, refreshToken);
                }
                // Access Token is valid, proceed to the next middleware
                return next();
            });
        }
        else {
            // No Access Token, fallback to refresh token
            return handleRefreshToken(req, res, next, refreshToken);
        }
        //Implement additional security measures like IP address or device fingerprinting for refresh tokens.
    }
    catch (error) {
        return (0, responseHelper_1.default)(res, error);
    }
}
function handleRefreshToken(req, res, next, refreshToken) {
    try {
        if (!refreshToken) {
            throw new response_model_1.CustomError("Unauthorized user. Please sign in!", 401);
        }
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, userData) => {
            if (err) {
                throw new response_model_1.CustomError("Unauthorized user. Please sign in!", 401);
            }
            // Issue new Access Token
            const newAccessToken = jsonwebtoken_1.default.sign(userData, process.env.ACCESS_TOKEN_KEY, {
                expiresIn: "15m",
            });
            // Optionally, issue a new Refresh Token (Token Rotation)
            const newRefreshToken = jsonwebtoken_1.default.sign(userData, process.env.REFRESH_TOKEN_KEY, {
                expiresIn: "7d",
            });
            res.cookie("accessToken", newAccessToken, {
                maxAge: 15 * 60 * 1000, //15 minutes in millisenconds
                path: "/",
                sameSite: "lax",
                secure: false,
                httpOnly: true,
            });
            res.cookie("refreshToken", newRefreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
                path: "/",
                sameSite: "lax",
                secure: false,
                httpOnly: true,
            });
            return next();
        });
    }
    catch (error) {
        return (0, responseHelper_1.default)(res, error);
    }
}
exports.default = verifyUserAuthentication;
