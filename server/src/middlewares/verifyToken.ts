import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User"; // Adjust the import path as necessary

dotenv.config();

interface JwtPayload {
  _id: string;
  isAdmin?: boolean;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Lấy access token từ header
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const accessToken = authorizationHeader.split(" ")[1];

      if (!process.env.ACCESS_TOKEN) {
        return res.status(500).json({
          success: false,
          message: "Server configuration error",
        });
      }

      // Giải mã access token sử dụng chữ ký được chia sẻ giữa máy chủ và client
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN
      ) as JwtPayload;

      // Tìm kiếm user liên quan đến access token
      const user = await User.findById(decodedToken._id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid access token",
        });
      }

      req.userId = user._id;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Require authentication",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const accessToken = authorizationHeader.split(" ")[1];

      if (!process.env.ACCESS_TOKEN) {
        return res.status(500).json({
          success: false,
          message: "Server configuration error",
        });
      }

      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN
      ) as JwtPayload;

      const user = await User.findById(decodedToken._id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid access token",
        });
      }

      if (!user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Admin access required",
        });
      }

      req.userId = user._id;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Require authentication",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { verifyAccessToken, verifyAdmin };
