import { Request, Response } from "express";

import { hash, compare } from "bcrypt";

import { ProfileDataInterface, UserAuthInterface } from "../models/user.models";
import {
  CustomError,
  ResponseI,
  ResponseStructure,
} from "../models/response.model";
import responseHelper from "../utils/responseHelper";
import { validationResult } from "express-validator";
import expressValidatorHelper from "../utils/expressValidatorHelper";
import generateUserToken from "../utils/generateToken";

async function createUserAccount(req: Request, res: Response) {
  try {
    //Validate user data and provides an error response
    const errors = validationResult(req);
    const error = expressValidatorHelper(errors);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ResponseStructure(false, null, null, error));
    }

    const { email, password } = req.body;
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ResponseStructure(false, null, null, error));
    }

    //Check if user already exists in the database
    // const existingUser =
    //if error, use custom error and throw the error

    //Hash the password
    const hashedPassword = await hash(
      password,
      Number(process.env.P_HASH_KEY!)
    ); //takes  1s

    //Save data to the database

    res.status(201).json(new ResponseStructure(true));
  } catch (err) {
    responseHelper(res, err);
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
    responseHelper(res, error);
  }
}

function createUserProfile(req: Request, res: Response) {
  const profileData: ProfileDataInterface = {
    salutation: req.body.salutation,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    phone: req.body.phone,
  };

  //Send data to the database

  //Provide a response

  res.status(201).json(new ResponseStructure(true));

  try {
  } catch (error) {
    const response = new ResponseStructure(false, null, null, {
      code: 501,
      message: "Something went wrong in the server whilst creating profile!",
    });
    res.status(501).json(response);
  }
}

export { createUserAccount, signinUserUser, createUserProfile };
