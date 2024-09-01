import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../models/response.model";
import responseHelper from "../utils/responseHelper";

function verifyUserAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;
  try {
    if (!accessToken && !refreshToken) {
      throw new CustomError("Unauthorized user. Please sign in!", 401);
    }

    // Verify Access Token
    if (accessToken) {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY!, (err: any) => {
        if (err) {
          // Access Token is invalid or expired, fallback to refresh token
          return handleRefreshToken(req, res, next, refreshToken);
        }
        // Access Token is valid, proceed to the next middleware
        return next();
      });
    } else {
      // No Access Token, fallback to refresh token
      return handleRefreshToken(req, res, next, refreshToken);
    }

    //Implement additional security measures like IP address or device fingerprinting for refresh tokens.
  } catch (error) {
    return responseHelper(res, error);
  }
}

function handleRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
  refreshToken: string
) {
  try {
    if (!refreshToken) {
      throw new CustomError("Unauthorized user. Please sign in!", 401);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY!,
      (err, userData: any) => {
        if (err) {
          throw new CustomError("Unauthorized user. Please sign in!", 401);
        }

        // Issue new Access Token
        const newAccessToken = jwt.sign(
          userData,
          process.env.ACCESS_TOKEN_KEY!,
          {
            expiresIn: "15m",
          }
        );

        // Optionally, issue a new Refresh Token (Token Rotation)
        const newRefreshToken = jwt.sign(
          userData,
          process.env.REFRESH_TOKEN_KEY!,
          {
            expiresIn: "7d",
          }
        );

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
      }
    );
  } catch (error) {
    return responseHelper(res, error);
  }
}

export default verifyUserAuthentication;
