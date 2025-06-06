import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
  _id: string;
  isAdmin?: boolean;
}

const generateAccessToken = (_id: string, isAdmin: boolean): string => {
  if (!process.env.ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN environment variable is not defined");
  }
  return jwt.sign({ _id, isAdmin }, process.env.ACCESS_TOKEN, {
    expiresIn: "365d",
  });
};

const generateRefreshToken = (_id: string): string => {
  if (!process.env.REFRESH_TOKEN) {
    throw new Error("REFRESH_TOKEN environment variable is not defined");
  }
  return jwt.sign({ _id }, process.env.REFRESH_TOKEN, { expiresIn: "365d" });
};

const verifyRefreshToken = (refresh_token: string): JwtPayload => {
  if (!process.env.REFRESH_TOKEN) {
    throw new Error("REFRESH_TOKEN environment variable is not defined");
  }
  return jwt.verify(refresh_token, process.env.REFRESH_TOKEN) as JwtPayload;
};

export { generateAccessToken, generateRefreshToken, verifyRefreshToken };
