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
    try {
        const accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken;
        console.log(`The tokens: ${accessToken} and ${refreshToken}`);
        if (!accessToken && !refreshToken) {
            throw new response_model_1.CustomError("Unauthorized user. Please sign in!", 401);
        }
        let decodedToken;
        if (accessToken)
            jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_KEY); //If the token is invalid or expired: It throws an error.
        if (refreshToken)
            decodedToken = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        req.userData = decodedToken;
        return next();
    }
    catch (error) {
        (0, responseHelper_1.default)(res, error);
        return;
    }
}
exports.default = verifyUserAuthentication;
// async function verifyUserAuthentication(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const accessToken = req.cookies?.accessToken;
//     const refreshToken = req.cookies?.refreshToken;
//     if (!accessToken && !refreshToken) {
//       console.log("This is hit");
//       throw new CustomError("Unauthorized user. Please sign in!", 401);
//     }
//     //Verify Access Token
//     if (accessToken) {
//       jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY!, (err: any) => {
//         if (err) {
//           if (refreshToken) {
//             jwt.verify(
//               refreshToken,
//               process.env.REFRESH_TOKEN_KEY!,
//               (err: any, userData: any) => {
//                 if (err) {
//                   throw new CustomError(
//                     "Unauthorized user. Please sign in!",
//                     401
//                   );
//                 }
//                 console.log("We do get the user here");
//                 const { _id, username } = userData;
//                 // Issue new Access Token
//                 const newAccessToken = jwt.sign(
//                   { _id, username },
//                   process.env.ACCESS_TOKEN_KEY!,
//                   {
//                     expiresIn: "15m",
//                   }
//                 );
//                 //Set the new accessToken
//                 res.cookie("accessToken", newAccessToken, {
//                   maxAge: 15 * 60 * 1000, //15 minutes in milliseconds
//                   path: "/",
//                   sameSite: "lax",
//                   secure: false,
//                   httpOnly: true,
//                 });
//               }
//             );
//           }
//         }
//         // Access Token is valid, proceed to the next middleware
//         console.log("We are here");
//         return next();
//       });
//       console.log("We do reach here");
//     } else {
//       if (refreshToken) {
//         jwt.verify(
//           refreshToken,
//           process.env.REFRESH_TOKEN_KEY!,
//           (err: any, userData: any) => {
//             if (err) {
//               console.log("We do throw an error");
//               throw new CustomError("Unauthorized user. Please sign in!", 401);
//             }
//             const { _id, username } = userData;
//             // Issue new Access Token
//             const newAccessToken = jwt.sign(
//               { _id, username },
//               process.env.ACCESS_TOKEN_KEY!,
//               {
//                 expiresIn: "15m",
//               }
//             );
//             console.log(newAccessToken);
//             //Set the new accessToken
//             // res.cookie("accessToken", newAccessToken, {
//             //   maxAge: 15 * 60 * 1000, //15 minutes in milliseconds
//             //   path: "/",
//             //   sameSite: "lax",
//             //   secure: false,
//             //   httpOnly: true,
//             // });
//           }
//         );
//         console.log("We are now here");
//         next();
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     return responseHelper(res, error);
//   }
// }
// export default verifyUserAuthentication;
// function verifyUserAuthentication(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   console.log("Authentication middleware!");
//   console.log(req.cookies);
//   const accessToken = req.cookies?.accessToken;
//   const refreshToken = req.cookies?.refreshToken;
//   try {
//     if (!accessToken && !refreshToken) {
//       throw new CustomError("Unauthorized user. Please sign in!", 401);
//     }
//     // Verify Access Token
//     if (accessToken) {
//       console.log("We're in here!");
//       jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY!, (err: any) => {
//         if (err) {
//           // Access Token is invalid or expired, fallback to refresh token
//           handleRefreshToken(req, res, next, refreshToken);
//         }
//         // Access Token is valid, proceed to the next middleware
//         return next();
//       });
//     } else {
//       console.log("We're in the other place");
//       // No Access Token, fallback to refresh token
//       handleRefreshToken(req, res, next, refreshToken);
//     }
//     //Implement additional security measures like IP address or device fingerprinting for refresh tokens.
//   } catch (error) {
//     return responseHelper(res, error);
//   }
// }
// function handleRefreshToken(
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   refreshToken: string
// ) {
//   try {
//     if (!refreshToken) {
//       throw new CustomError("Unauthorized user. Please sign in!", 401);
//     }
//     jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN_KEY!,
//       (err, userData: any) => {
//         if (err) {
//           throw new CustomError("Unauthorized user. Please sign in!", 401);
//         }
//         const { _id, username } = userData;
//         // Issue new Access Token
//         const newAccessToken = jwt.sign(
//           { _id, username },
//           process.env.ACCESS_TOKEN_KEY!,
//           {
//             expiresIn: "15m",
//           }
//         );
//         // Optionally, issue a new Refresh Token (Token Rotation)
//         const newRefreshToken = jwt.sign(
//           { _id, username },
//           process.env.REFRESH_TOKEN_KEY!,
//           {
//             expiresIn: "7d",
//           }
//         );
//         res.cookie("accessToken", newAccessToken, {
//           maxAge: 15 * 60 * 1000, //15 minutes in millisenconds
//           path: "/",
//           sameSite: "lax",
//           secure: false,
//           httpOnly: true,
//         });
//         res.cookie("refreshToken", newRefreshToken, {
//           maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
//           path: "/",
//           sameSite: "lax",
//           secure: false,
//           httpOnly: true,
//         });
//       }
//     );
//     return next();
//   } catch (error) {
//     return responseHelper(res, error);
//   }
// }
// export default verifyUserAuthentication;
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { CustomError } from "../models/response.model";
// import responseHelper from "../utils/responseHelper";
// async function verifyUserAuthentication(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   console.log("Authentication middleware!");
//   const accessToken = req.cookies?.accessToken;
//   const refreshToken = req.cookies?.refreshToken;
//   if (!accessToken && !refreshToken) {
//     // No tokens present, send response and stop further execution
//     return responseHelper(
//       res,
//       new CustomError("Unauthorized user. Please sign in!", 401)
//     );
//   }
//   if (accessToken) {
//     jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY!, async (err: any) => {
//       if (err) {
//         // Access Token expired or invalid, fallback to refresh token
//         return await handleRefreshToken(req, res, next, refreshToken);
//       }
//       // Access Token is valid, proceed to the next middleware
//       return next();
//     });
//   } else {
//     // No Access Token, fallback to refresh token
//     return await handleRefreshToken(req, res, next, refreshToken);
//   }
// }
// async function handleRefreshToken(
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   refreshToken: string
// ) {
//   if (!refreshToken) {
//     return responseHelper(
//       res,
//       new CustomError("Unauthorized user. Please sign in!", 401)
//     );
//   }
//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_KEY!,
//     (err, userData: any) => {
//       if (err) {
//         // Refresh Token is invalid, send response
//         return responseHelper(
//           res,
//           new CustomError("Unauthorized user. Please sign in!", 401)
//         );
//       }
//       console.log(userData);
//       `{
//   _id: 'f8566ec5-3537-48a3-b0a9-c10a6cfd1b40',
//   username: 'john',
//   iat: 1726061227,
//   exp: 1726666027
// }`;
//       const { _id, username } = userData;
//       // Issue new Access Token and Refresh Token
//       const newAccessToken = jwt.sign(
//         { _id, username },
//         process.env.ACCESS_TOKEN_KEY!,
//         {
//           expiresIn: "15m",
//         }
//       );
//       const newRefreshToken = jwt.sign(
//         { _id, username },
//         process.env.REFRESH_TOKEN_KEY!,
//         { expiresIn: "7d" }
//       );
//       // Set cookies for both tokens
//       res.cookie("accessToken", newAccessToken, {
//         maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
//         path: "/",
//         sameSite: "lax",
//         secure: false,
//         httpOnly: true,
//       });
//       res.cookie("refreshToken", newRefreshToken, {
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
//         path: "/",
//         sameSite: "lax",
//         secure: false,
//         httpOnly: true,
//       });
//       // Proceed to the next middleware after refreshing tokens
//       return next();
//     }
//   );
// }
// export default verifyUserAuthentication;
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { CustomError } from "../models/response.model";
// import responseHelper from "../utils/responseHelper";
// async function verifyUserAuthentication(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   console.log("Authentication middleware!");
//   const accessToken = req.cookies?.accessToken;
//   const refreshToken = req.cookies?.refreshToken;
//   // If no accessToken and refreshToken, send response and stop further execution
//   if (!accessToken && !refreshToken) {
//     return responseHelper(
//       res,
//       new CustomError("Unauthorized user. Please sign in!", 401)
//     );
//   }
//   if (accessToken) {
//     // Verify Access Token
//     jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY!, (err: any) => {
//       if (err) {
//         // Access Token expired or invalid, handle refresh
//         handleRefreshToken(req, res, next, refreshToken);
//       } else {
//         // Access Token valid, proceed to the next middleware
//         next();
//       }
//     });
//   } else {
//     // No Access Token, fallback to refresh token
//     handleRefreshToken(req, res, next, refreshToken);
//   }
// }
// async function handleRefreshToken(
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   refreshToken: string
// ) {
//   // If no refresh token, respond with unauthorized
//   if (!refreshToken) {
//     return responseHelper(
//       res,
//       new CustomError("Unauthorized user. Please sign in!", 401)
//     );
//   }
//   // Verify the Refresh Token
//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_KEY!,
//     (err: any, userData: any) => {
//       if (err) {
//         // Invalid Refresh Token, send error response
//         return responseHelper(
//           res,
//           new CustomError("Unauthorized user. Please sign in!", 401)
//         );
//       }
//       const { _id, username } = userData;
//       // Issue new tokens
//       const newAccessToken = jwt.sign(
//         { _id, username },
//         process.env.ACCESS_TOKEN_KEY!,
//         { expiresIn: "15m" }
//       );
//       const newRefreshToken = jwt.sign(
//         { _id, username },
//         process.env.REFRESH_TOKEN_KEY!,
//         { expiresIn: "7d" }
//       );
//       // Set new cookies
//       res.cookie("accessToken", newAccessToken, {
//         maxAge: 15 * 60 * 1000, // 15 minutes
//         path: "/",
//         sameSite: "lax",
//         secure: false,
//         httpOnly: true,
//       });
//       res.cookie("refreshToken", newRefreshToken, {
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//         path: "/",
//         sameSite: "lax",
//         secure: false,
//         httpOnly: true,
//       });
//       // Proceed to the next middleware only after refreshing tokens
//       return next();
//     }
//   );
// }
// export default verifyUserAuthentication;
