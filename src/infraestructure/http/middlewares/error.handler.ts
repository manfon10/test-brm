import { NextFunction, Request, Response } from "express";

import { Result, ValidationError } from "express-validator";

import { AppError, HttpCode } from "../../../shared";

export interface ErrorResponse {
  name: string;
  message: string;
  validationErrors?: Result<ValidationError>;
  stack?: string;
}

export class ErrorMiddleware {
  public static handleError = (
    error: unknown,
    _: Request,
    res: Response<ErrorResponse>,
    next: NextFunction
  ): void => {
    if (error instanceof AppError) {
      const { message, name, stack, validationErrors } = error;

      const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;

      res.status(statusCode).json({ name, message, validationErrors, stack });
    } else {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        name: "InternalServerError",
        message: "An internal server error occurred",
        stack: process.env.NODE_ENV === "development" ? (error as string) : undefined,
      });
    }

    next();
  };
}
