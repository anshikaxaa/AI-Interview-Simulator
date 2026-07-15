import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { jobDescriptionService } from "../services/createJobDescription.service";
import { getJobDescriptionService } from "../services/getJobDescription.service";
import { listJobDescriptionsService } from "../services/listJobDescription.service";
import { updateJobDescriptionService } from "../services/updateJobDescription.service";
import { deleteJobDescriptionService } from "../services/deleteJobDescription.service";

export class JobDescriptionController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, companyName } = req.body;

      const file = req.file;
      const userId = req.user?.id ?? req.user?.userId;

      if (!file || !userId) {
        throw new AppError(
          "Job description file and authenticated user are required.",
          400
        );
      }

      const jobDescription =
        await jobDescriptionService.createJobDescription({
          title,
          companyName,
          userId,
          file,
        });

      res.status(201).json({
        success: true,
        message: "Job description uploaded successfully.",
        data: {
          id: jobDescription.id,
          title: jobDescription.title,
          companyName: jobDescription.companyName,
          originalFileName: jobDescription.originalFileName,
          createdAt: jobDescription.createdAt,
          updatedAt: jobDescription.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id ?? req.user?.userId;

    if (!userId) {
      throw new AppError(
        "Authenticated user is required.",
        401
      );
    }

    const jobDescriptions =
      await listJobDescriptionsService.execute(userId);

    res.status(200).json({
      success: true,
      data: jobDescriptions,
    });
  } catch (error) {
    next(error);
  }
}

async getById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const jobDescriptionId = req.params.id;
    const userId = req.user?.id ?? req.user?.userId;

    if (!userId) {
      throw new AppError(
        "Authenticated user is required.",
        401
      );
    }

    const jobDescription =
      await getJobDescriptionService.execute(
        userId,
        jobDescriptionId
      );

    res.status(200).json({
      success: true,
      data: jobDescription,
    });
  } catch (error) {
    next(error);
  }
}


async update(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const jobDescriptionId = req.params.id;
    const userId = req.user?.id ?? req.user?.userId;

    if (!userId) {
      throw new AppError(
        "Authenticated user is required.",
        401
      );
    }

    const jobDescription =
      await updateJobDescriptionService.execute(
        userId,
        jobDescriptionId,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Job description updated successfully.",
      data: jobDescription,
    });
  } catch (error) {
    next(error);
    }
  }


async delete(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const jobDescriptionId = req.params.id;
    const userId = req.user?.id ?? req.user?.userId;

    if (!userId) {
      throw new AppError(
        "Authenticated user is required.",
        401
      );
    }

    await deleteJobDescriptionService.execute(
      userId,
      jobDescriptionId
    );

    res.status(200).json({
      success: true,
      message: "Job description deleted successfully.",
    });
  } catch (error) {
    next(error);
    }
  }
}

export const jobDescriptionController = new JobDescriptionController();