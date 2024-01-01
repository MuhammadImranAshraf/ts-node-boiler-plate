import { NextFunction, Response } from "express";
import AppError from "utils/app_error.util";
import { IVRequest } from "v1/types/auth_request";

// class ValidationChecker {
const PayloadValidator = (func: any, type: string = "body") => {
  return (req: IVRequest, res: Response, next: NextFunction) => {
    let validationResult: any = {};

    switch (type) {
      case "body":
        validationResult = func(req.body as any);
        req.validatedBody = validationResult?.value;
        break;

      case "query":
        validationResult = func(req.query as any);
        req.validatedQuery = validationResult?.value;
        break;

      case "params":
        validationResult = func(req.params as any);
        req.validatedParams = validationResult?.value;
        break;

      default:
        console.log("validation checker not found");
        break;
    }

    if (validationResult.error) {
      let validationError = validationResult.error.details[0].message;
      return next(new AppError(validationError, 400));
    }

    next();
  };
};

export default PayloadValidator;
