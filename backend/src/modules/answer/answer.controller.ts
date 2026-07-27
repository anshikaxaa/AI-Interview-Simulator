import { Request, Response } from "express";

export const answerController = {
  async create(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: "Answer endpoint reached",
    });
  },
};