import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import ErrorResponse from "../interfaces/ErrorResponse";

// Requested endpoint does not exist
export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Endpoint Not Found: '${req.originalUrl}'`);
  next(error);
}

// An error occured during the transaction
export function errorHandler(
  error: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  // Catch and handle zod errors.
  if (statusCode === 422 && error instanceof ZodError) {
    return res.json({
      message:
        "Error: Request failed validation. Check the request params, body, and/or query.",
      zod_errors: error.issues.map((issue) => {
        return { message: issue.message, path: issue.path.toString() };
      }),
    });
  }

  // Catch and handle unknown errors
  return res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
  });
}
