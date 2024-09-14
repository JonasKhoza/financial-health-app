import { Request, Response } from "express";
import { validationResult } from "express-validator";
import expressValidatorHelper from "../utils/expressValidatorHelper";
import { CustomError, ResponseStructure } from "../models/response.model";
import responseHelper from "../utils/responseHelper";
import { PoolClient } from "pg";
import pool from "../utils/dbConfig";
import { JwtPayload } from "jsonwebtoken";
import { getFinancialAnalysis } from "../utils/openaiClient";

interface CustomRequest extends Request {
  userData?: JwtPayload;
}
async function getQuizData(req: CustomRequest, res: Response) {
  let client: PoolClient | null = null;
  try {
    const { _id } = req.userData as JwtPayload;

    client = await pool.connect();
    const queryText = `SELECT * FROM quiz_responses WHERE user_id = $1;`;
    const userQuiz = await client.query(queryText, [_id]);

    if (userQuiz.rows.length > 0) {
      return res
        .status(200)
        .json(new ResponseStructure(true, userQuiz.rows[0], null));
    }

    res.status(200).json(new ResponseStructure(false, []));
  } catch (error) {
  } finally {
    client?.release();
  }
}

async function createQuiz(req: CustomRequest, res: Response) {
  let client: PoolClient | null = null;

  try {
    const errors = validationResult(req);
    const error = expressValidatorHelper(errors);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ResponseStructure(false, null, null, error));
    }
    client = await pool.connect();
    const { _id } = req.userData as JwtPayload;
    //Check if a user already exists
    const existingUser = await client.query(
      `SELECT user_id FROM quiz_responses WHERE user_id = $1`,
      [_id]
    );

    if (existingUser.rows.length > 0) {
      throw new CustomError("Quiz already created!", 400);
    }

    const {
      "1": question_1,
      "2": question_2,
      "3": question_3,
      "4": question_4,
      "5": question_5,
      "6": question_6,
      "7": question_7,
      "8": question_8,
      "9": question_9,
      "10": question_10,
      "11": question_11,
      "12": question_12,
      "13": question_13,
      "14": question_14,
      "15": question_15,
      "16": question_16,
    } = req.body.quiz;

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
    await client.query(queryText, [
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
    const prompt = `
    You are a financial advisor analyzing a user's financial health based on their quiz responses. The user is from the Republic of South Africa, so the currency is ZAR (rands). The user has provided answers related to the following categories:
    - Emergency Fund
    - Expense Management
    - Personal Debt
    - Insurance
    - Retirement Target

    Provide a score out of 10 for each category and include personalized recommendations. 

    Quiz Responses:
    ${JSON.stringify(req.body.quiz)}

    Response Format:
    {
      "Emergency Fund": {
        "score": 7,
        "recommendations": [
          "Increase monthly contributions to your emergency fund by 10%."
        ]
      },
      ...
    }
  `;

    const analysis = await getFinancialAnalysis(prompt);

    //Get response from OpenAI API and save it to the Database

    //Pass the OpenAI API response to the frontend

    res.status(201).json(new ResponseStructure(true));
  } catch (error) {
    return responseHelper(res, error);
  } finally {
    client?.release();
  }
}

async function updateQuizData(req: CustomRequest, res: Response) {
  let client: PoolClient | null = null;
  try {
    const errors = validationResult(req);
    const error = expressValidatorHelper(errors);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ResponseStructure(false, null, null, error));
    }

    const {
      "1": question_1,
      "2": question_2,
      "3": question_3,
      "4": question_4,
      "5": question_5,
      "6": question_6,
      "7": question_7,
      "8": question_8,
      "9": question_9,
      "10": question_10,
      "11": question_11,
      "12": question_12,
      "13": question_13,
      "14": question_14,
      "15": question_15,
      "16": question_16,
    } = req.body.quiz;

    const { _id } = req.userData as JwtPayload;

    //Create a client
    client = await pool.connect();

    //Check if the user has a quiz first
    const existingUser = await client.query(
      `SELECT _id FROM quiz_responses WHERE user_id = $1`,
      [_id]
    );

    if (existingUser.rows.length <= 0) {
      throw new CustomError("User does not have a quiz!", 400);
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

    await client?.query(queryText, [
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
    ]);

    //Resend to OpenAI

    res.status(201).json(new ResponseStructure(true));
  } catch (error) {
    return responseHelper(res, error);
  } finally {
    client?.release();
  }
}

export { getQuizData, createQuiz, updateQuizData };
