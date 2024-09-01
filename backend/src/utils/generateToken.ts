import jwt from "jsonwebtoken";
import { jwtUserPayload } from "../models/authentication.models";

function generateUserToken(userData: jwtUserPayload) {
  // Generate access token (short-lived)
  const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_KEY!, {
    expiresIn: "15m", // Access token valid for 15 minutes
  });

  // Generate refresh token (longer-lived)
  const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_KEY!, {
    expiresIn: "7d", // Refresh token valid for 7 days
  });

  return { accessToken, refreshToken };
}

export default generateUserToken;
