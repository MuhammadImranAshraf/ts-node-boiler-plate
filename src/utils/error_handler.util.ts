import { NextFunction, Request, Response } from "express";
import AppError from "./app_error.util";
import AppResponse from "./response.util";
import { statusCode } from "./status_code.util";

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate Field Value: ${value}. Please use another value`;
  return new AppError(message, 400);
};
const handleValidationErrorDB: any = (err: any) => {
  const message = err;
  return new AppError(message, 422);
};
const handleJWTExpiredError = (err: any) =>
  new AppError("login season has been expired, login again", 401);
const handleJWTError = (err: any) => new AppError("Unauthorized", 401);

const AppErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };

  if (err.name === "CastError") {
    err = handleCastErrorDB(err);
  }
  if (err.code === 11000) {
    err = handleDuplicateFieldsDB(err);
  }
  if (err.name === "ValidationError") {
    err = handleValidationErrorDB(err);
  }
  if (err.name === "JsonWebTokenError") err = handleJWTError(err);
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError(err);
  AppResponse.error(err, res);
};

export default AppErrorHandler;
