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

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);

  req.user = {
    id: decoded.userId,
    userId: decoded.userId,
  };
  
  next();
} catch (error) {
    next(new AppError("Unauthorized", 401));
    }
}