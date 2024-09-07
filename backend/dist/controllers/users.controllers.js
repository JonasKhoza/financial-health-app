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
const express_validator_1 = require("express-validator");
const response_model_1 = require("../models/response.model");
const responseHelper_1 = __importDefault(require("../utils/responseHelper"));
const expressValidatorHelper_1 = __importDefault(require("../utils/expressValidatorHelper"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const dbConfig_1 = __importDefault(require("../utils/dbConfig"));
function createUserAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let client = null; // Explicitly type client
        try {
            //Connection to the database
            client = yield dbConfig_1.default.connect(); //Get a client from the pool
            if (!client) {
                // Handle the case where the client could not be obtained
                throw new response_model_1.CustomError("Failed to obtain a client from the pool", 500);
            }
            //Validate user data and provides an error response
            const errors = (0, express_validator_1.validationResult)(req);
            const error = (0, expressValidatorHelper_1.default)(errors);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json(new response_model_1.ResponseStructure(false, null, null, error));
            }
            //Extract user data
            const { email, password, username } = req.body;
            const queryText = `
          SELECT * FROM users WHERE email = $1
    `;
            //Check if user already exists in the database
            const existingUser = yield client.query(queryText, [email]);
            if (existingUser.rows.length > 0) {
                throw new response_model_1.CustomError("User already exists!", 409);
            }
            const results = yield client.query(`SELECT username FROM users WHERE username ILIKE $1`, [username]);
            if (results.rows.length > 0) {
                throw new response_model_1.CustomError("Username is already taken!", 409);
            }
            //Hash the password
            const hashedPassword = yield (0, bcrypt_1.hash)(password, Number(process.env.P_HASH_KEY)); //takes  1s
            //Save data to the database
            yield client.query(`INSERT INTO users(email, password, username) VALUES($1, $2, $3)`, [email, hashedPassword, username]);
            res.status(201).json(new response_model_1.ResponseStructure(true));
        }
        catch (err) {
            console.log(err);
            return (0, responseHelper_1.default)(res, err);
        }
        finally {
            if (client) {
                // Return the connection to the pool
                client.release();
            }
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
            return (0, responseHelper_1.default)(res, error);
        }
    });
}
exports.signinUserUser = signinUserUser;
function createUserProfile(req, res) {
    try {
        const profileData = {
            salutation: req.body.salutation,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            phone: req.body.phone,
        };
        //Send data to the database
        //Provide a response
        return res.status(201).json(new response_model_1.ResponseStructure(true));
    }
    catch (error) {
        return (0, responseHelper_1.default)(res, error);
    }
}
exports.createUserProfile = createUserProfile;
