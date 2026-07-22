import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validateRequest(schema: z.ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = validatedData.body;

      next();
    } catch (error) {
      next(error);
    }
  };
}