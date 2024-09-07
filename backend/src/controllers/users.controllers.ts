import { Request, Response } from "express";

import { hash, compare } from "bcrypt";
import { validationResult } from "express-validator";
import { PoolClient } from "pg";

import { ProfileDataInterface } from "../models/user.models";
import { CustomError, ResponseStructure } from "../models/response.model";
import responseHelper from "../utils/responseHelper";

import expressValidatorHelper from "../utils/expressValidatorHelper";
import generateUserToken from "../utils/generateToken";
import pool from "../utils/dbConfig";

async function createUserAccount(req: Request, res: Response) {
  let client: PoolClient | null = null; // Explicitly type client
  try {
    //Connection to the database
    client = await pool.connect(); //Get a client from the pool
    if (!client) {
      // Handle the case where the client could not be obtained
      throw new CustomError("Failed to obtain a client from the pool", 500);
    }
    //Validate user data and provides an error response
    const errors = validationResult(req);
    const error = expressValidatorHelper(errors);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ResponseStructure(false, null, null, error));
    }

    //Extract user data
    const { email, password, username } = req.body;

    const queryText = `
          SELECT * FROM users WHERE email = $1
    `;

    //Check if user already exists in the database
    const existingUser = await client.query(queryText, [email]);

    if (existingUser.rows.length > 0) {
      throw new CustomError("User already exists!", 409);
    }

    const results = await client.query(
      `SELECT username FROM users WHERE username ILIKE $1`,
      [username]
    );

    if (results.rows.length > 0) {
      throw new CustomError("Username is already taken!", 409);
    }

    //Hash the password
    const hashedPassword = await hash(
      password,
      Number(process.env.P_HASH_KEY!)
    ); //takes  1s

    //Save data to the database
    await client.query(
      `INSERT INTO users(email, password, username) VALUES($1, $2, $3)`,
      [email, hashedPassword, username]
    );

    res.status(201).json(new ResponseStructure(true));
  } catch (err) {
    console.log(err);
    return responseHelper(res, err);
  } finally {
    if (client) {
      // Return the connection to the pool
      client.release();
    }
  }
}

async function signinUserUser(req: Request, res: Response) {
  try {
    //Validate user data and provides an error response
    const errors = validationResult(req);
    const error = expressValidatorHelper(errors);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ResponseStructure(false, null, null, error));
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
    const { accessToken, refreshToken } = generateUserToken({
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

    res.status(200).json(new ResponseStructure(true));
  } catch (error) {
    return responseHelper(res, error);
  }
}

function createUserProfile(req: Request, res: Response) {
  try {
    const profileData: ProfileDataInterface = {
      salutation: req.body.salutation,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      phone: req.body.phone,
    };

    //Send data to the database

    //Provide a response

    return res.status(201).json(new ResponseStructure(true));
  } catch (error) {
    return responseHelper(res, error);
  }
}

export { createUserAccount, signinUserUser, createUserProfile };
