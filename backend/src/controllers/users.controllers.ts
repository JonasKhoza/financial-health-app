import { Request, Response } from "express";

import { hash, compare } from "bcrypt";
import { validationResult } from "express-validator";
import { PoolClient } from "pg";
import { JwtPayload } from "jsonwebtoken";

import { CustomError, ResponseStructure } from "../models/response.model";
import responseHelper from "../utils/responseHelper";
import expressValidatorHelper from "../utils/expressValidatorHelper";
import generateUserToken from "../utils/generateToken";
import pool from "../utils/dbConfig";

interface CustomRequest extends Request {
  userData?: JwtPayload;
}

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
      `INSERT INTO users(email, password, username) VALUES($1, $2, $3);`,
      [email, hashedPassword, username]
    );

    res.status(201).json(new ResponseStructure(true));
  } catch (err) {
    console.log(err);
    return responseHelper(res, err);
  } finally {
    // Return the connection to the pool
    client?.release();
  }
}

async function signinUser(req: Request, res: Response) {
  let client: PoolClient | null = null; // Explicitly type client
  try {
    //Check if a user is already logged in
    const hasAccessToken = req.cookies?.accessToken;
    const hasRefreshToken = req.cookies?.refreshToken;

    if (hasAccessToken || hasRefreshToken) {
      throw new CustomError("User is already logged in!", 400);
    }

    //Create a client
    client = await pool.connect(); //Get a client from the pool
    if (!client) {
      // Handle the case where the client could not be obtained
      throw new CustomError("Something went wrong in our servers!", 500);
    }
    //Validate user data and provides an error response
    const errors = validationResult(req);
    const error = expressValidatorHelper(errors);

    const { username, password } = req.body;

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ResponseStructure(false, null, null, error));
    }
    const queryText = `SELECT _id, username, password FROM users WHERE username ILIKE $1`;
    //Check if username exist in DB
    const existingUsername = await client.query(queryText, [username]);
    if (existingUsername.rows.length <= 0) {
      throw new CustomError(
        "User not found. Please enter valid credentials!",
        404
      );
    }

    //Compare the provided password hash with existing hash
    const user = existingUsername.rows[0]; // Get the first row(object) from the result

    const { _id, username: dbUsername, password: dbHashedPassword } = user; // Destructure to extract fields
    const isPasswordMatch = await compare(password, dbHashedPassword);

    if (!isPasswordMatch) {
      throw new CustomError("Invalid credentials. Please try again!", 401);
    }

    const { accessToken, refreshToken } = generateUserToken({
      _id,
      username: dbUsername,
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

    return res.status(200).json(new ResponseStructure(true, { accessToken }));
  } catch (error) {
    return responseHelper(res, error);
  } finally {
    client?.release(); //Return connection to the pool
  }
}

async function createUserProfile(req: CustomRequest, res: Response) {
  console.log("Route hit!");
  let client: PoolClient | null = null;
  try {
    //Validate the provided data
    const errors = validationResult(req);
    const error = expressValidatorHelper(errors);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ResponseStructure(false, null, null, error));
    }

    const { salutation, firstName, lastName, phone } = req.body;

    client = await pool.connect();
    if (!client) {
      throw new CustomError("Something went wrong in our servers!", 500);
    }

    const userData = req.userData;

    //Check if a user already has a profile
    const userProfile = await client.query(
      `SELECT user_id FROM profiles WHERE user_id = $1`,
      [userData?._id]
    );

    if (userProfile.rows.length > 0) {
      throw new CustomError("User already has a profile!", 409);
    }

    const queryText = `INSERT INTO profiles(salutation, first_name, last_name, phone, user_id) VALUES($1, $2, $3, $4, $5);`;
    //Send data to the database
    await client.query(queryText, [
      salutation,
      firstName,
      lastName,
      phone,
      userData?._id,
    ]);
    //Provide a response
    return res.status(201).json(new ResponseStructure(true));
  } catch (error) {
    return responseHelper(res, error);
  } finally {
    client?.release();
  }
}

export { createUserAccount, signinUser, createUserProfile };
