import { NextFunction } from "express";
import AppError from "./app_error.util";

const validationChecker = (validationResult: any, next: NextFunction) => {
  if (validationResult.error) {
    let validationError = validationResult.error.details[0].message;
    return next(new AppError(validationError, 400));
  }
  return;
};
export default validationChecker;
