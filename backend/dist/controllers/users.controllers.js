"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserProfile = exports.signinUserUser = exports.createUserAccount = void 0;
const bcrypt_1 = require("bcrypt");
const response_model_1 = require("../models/response.model");
const responseHelper_1 = __importDefault(require("../utils/responseHelper"));
const express_validator_1 = require("express-validator");
const expressValidatorHelper_1 = __importDefault(require("../utils/expressValidatorHelper"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
function createUserAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Validate user data and provides an error response
            const errors = (0, express_validator_1.validationResult)(req);
            const error = (0, expressValidatorHelper_1.default)(errors);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json(new response_model_1.ResponseStructure(false, null, null, error));
            }
            const { email, password } = req.body;
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json(new response_model_1.ResponseStructure(false, null, null, error));
            }
            //Check if user already exists in the database
            // const existingUser =
            //if error, use custom error and throw the error
            //Hash the password
            const hashedPassword = yield (0, bcrypt_1.hash)(password, Number(process.env.P_HASH_KEY)); //takes  1s
            //Save data to the database
            res.status(201).json(new response_model_1.ResponseStructure(true));
        }
        catch (err) {
            (0, responseHelper_1.default)(res, err);
        }
    });
}
exports.createUserAccount = createUserAccount;
function signinUserUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Validate user data and provides an error response
            const errors = (0, express_validator_1.validationResult)(req);
            const error = (0, expressValidatorHelper_1.default)(errors);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json(new response_model_1.ResponseStructure(false, null, null, error));
            }
            const { username, password } = req.body;
            // //Check if username exist in DB
            // const existingUserQuery = null; //findOne(email)
            // // const existingUser:UserAuthI = await null; //existingUserQuery.exec()
            // if (existingUser == null) {
            //   throw new CustomError("User not found. Please enter valid credentials!", 404);
            // }
            // //Compare the provided password hash with existing hash
            // const isPasswordMatch = await compare(password, existingUser.password);
            // if (!isPasswordMatch) {
            //   throw new CustomError("Incorrect password. Please enter valid credentials!", 401);
            // }
            const { accessToken, refreshToken } = (0, generateToken_1.default)({
                _id: "",
                username,
            });
            res.cookie("accessToken", accessToken, {
                maxAge: 15 * 60 * 1000, //15 minutes in milliseconds
                path: "/",
                sameSite: "lax",
                secure: false,
                httpOnly: true,
            });
            res.cookie("refreshToken", refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
                path: "/",
                sameSite: "lax",
                secure: false,
                httpOnly: true,
            });
            res.status(200).json(new response_model_1.ResponseStructure(true));
        }
        catch (error) {
            (0, responseHelper_1.default)(res, error);
        }
    });
}
exports.signinUserUser = signinUserUser;
function createUserProfile(req, res) {
    const profileData = {
        salutation: req.body.salutation,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        phone: req.body.phone,
    };
    //Send data to the database
    //Provide a response
    res.status(201).json(new response_model_1.ResponseStructure(true));
    try {
    }
    catch (error) {
        const response = new response_model_1.ResponseStructure(false, null, null, {
            code: 501,
            message: "Something went wrong in the server whilst creating profile!",
        });
        res.status(501).json(response);
    }
}
exports.createUserProfile = createUserProfile;
