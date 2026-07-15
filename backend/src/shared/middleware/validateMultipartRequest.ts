import fs from "fs/promises";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validateMultipartRequest(schema: z.ZodTypeAny) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      if (req.file) {
        await fs.unlink(req.file.path).catch(() => {});
      }

      next(error);
    }
  };
}