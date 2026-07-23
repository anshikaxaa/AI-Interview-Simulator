import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validateRequest<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      }) as { body: unknown; params: unknown; query: unknown };

      req.body = validatedData.body;

      next();
    } catch (error) {
      next(error);
    }
  };
}