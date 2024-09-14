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
exports.updateQuizData = exports.createQuiz = exports.getQuizData = void 0;
const express_validator_1 = require("express-validator");
const expressValidatorHelper_1 = __importDefault(require("../utils/expressValidatorHelper"));
const response_model_1 = require("../models/response.model");
const responseHelper_1 = __importDefault(require("../utils/responseHelper"));
const dbConfig_1 = __importDefault(require("../utils/dbConfig"));
function getQuizData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let client = null;
        try {
            const { _id } = req.userData;
            client = yield dbConfig_1.default.connect();
            const queryText = `SELECT * FROM quiz_responses WHERE user_id = $1;`;
            const userQuiz = yield client.query(queryText, [_id]);
            if (userQuiz.rows.length > 0) {
                return res
                    .status(200)
                    .json(new response_model_1.ResponseStructure(true, userQuiz.rows[0], null));
            }
            res.status(200).json(new response_model_1.ResponseStructure(false, []));
        }
        catch (error) {
        }
        finally {
            client === null || client === void 0 ? void 0 : client.release();
        }
    });
}
exports.getQuizData = getQuizData;
function createQuiz(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let client = null;
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            const error = (0, expressValidatorHelper_1.default)(errors);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json(new response_model_1.ResponseStructure(false, null, null, error));
            }
            client = yield dbConfig_1.default.connect();
            const { _id } = req.userData;
            //Check if a user already exists
            const existingUser = yield client.query(`SELECT user_id FROM quiz_responses WHERE user_id = $1`, [_id]);
            if (existingUser.rows.length > 0) {
                throw new response_model_1.CustomError("Quiz already created!", 400);
            }
            const { "1": question_1, "2": question_2, "3": question_3, "4": question_4, "5": question_5, "6": question_6, "7": question_7, "8": question_8, "9": question_9, "10": question_10, "11": question_11, "12": question_12, "13": question_13, "14": question_14, "15": question_15, "16": question_16, } = req.body.quiz;
            //Get answers from user, save to DB then send to AI
            const queryText = `INSERT INTO quiz_responses(
        user_id ,
        question_1 ,    
        question_2 ,  
        question_3 ,    
        question_4 ,        
        question_5 ,   
        question_6 ,        
        question_7  ,        
        question_8  ,       
        question_9 ,         
        question_10 ,   
        question_11 ,  
        question_12 ,   
        question_13 ,        
        question_14 ,        
        question_15 ,
        question_16) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,$17);`;
            yield client.query(queryText, [
                _id,
                question_1,
                question_2,
                question_3,
                question_4,
                question_5,
                question_6,
                question_7,
                question_8,
                question_9,
                question_10,
                question_11,
                question_12,
                question_13,
                question_14,
                question_15,
                question_16,
            ]);
            //Send the data to OpenAI API
            //Get response from OpenAI API and save it to the Database
            //Pass the OpenAI API response to the frontend
            res.status(201).json(new response_model_1.ResponseStructure(true));
        }
        catch (error) {
            return (0, responseHelper_1.default)(res, error);
        }
        finally {
            client === null || client === void 0 ? void 0 : client.release();
        }
    });
}
exports.createQuiz = createQuiz;
function updateQuizData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let client = null;
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            const error = (0, expressValidatorHelper_1.default)(errors);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json(new response_model_1.ResponseStructure(false, null, null, error));
            }
            const { "1": question_1, "2": question_2, "3": question_3, "4": question_4, "5": question_5, "6": question_6, "7": question_7, "8": question_8, "9": question_9, "10": question_10, "11": question_11, "12": question_12, "13": question_13, "14": question_14, "15": question_15, "16": question_16, } = req.body.quiz;
            const { _id } = req.userData;
            //Create a client
            client = yield dbConfig_1.default.connect();
            //Check if the user has a quiz first
            const existingUser = yield client.query(`SELECT _id FROM quiz_responses WHERE user_id = $1`, [_id]);
            if (existingUser.rows.length <= 0) {
                throw new response_model_1.CustomError("User does not have a quiz!", 400);
            }
            const queryText = `UPDATE quiz_responses SET 
        question_1 = $1,    
        question_2 = $2,  
        question_3 = $3,    
        question_4 = $4,        
        question_5 = $5,   
        question_6 = $6,        
        question_7 = $7,        
        question_8 = $8,       
        question_9 = $9,         
        question_10 = $10,   
        question_11 = $11,  
        question_12 = $12,   
        question_13 = $13,        
        question_14 = $14,        
        question_15 = $15,
        question_16 = $16 WHERE user_id = $17`;
            yield (client === null || client === void 0 ? void 0 : client.query(queryText, [
                question_1,
                question_2,
                question_3,
                question_4,
                question_5,
                question_6,
                question_7,
                question_8,
                question_9,
                question_10,
                question_11,
                question_12,
                question_13,
                question_14,
                question_15,
                question_16,
                _id,
            ]));
            res.status(201).json(new response_model_1.ResponseStructure(true));
        }
        catch (error) {
            return (0, responseHelper_1.default)(res, error);
        }
        finally {
            client === null || client === void 0 ? void 0 : client.release();
        }
    });
}
exports.updateQuizData = updateQuizData;
