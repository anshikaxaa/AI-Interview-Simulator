import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
    try {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader); // Debugging line

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  console.log("Token:", token); // Debugging line

  const decoded = verifyToken(token);

  console.log("Decoded:", decoded); // Debugging line


  req.user = {
    id: decoded.userId,
    userId: decoded.userId,
  };
  
  next();
} catch (error) {
  console.error(error); // Log the error for debugging
    next(new AppError("Unauthorized", 401));
    }
}

