import { Response } from "express";
import AppError from "./app_error.util";
import config from "config";

class AppResponse {
  static error(err: AppError, res: Response) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (config.get("environment") === "development") {
      res.status(err.statusCode).json({
        code: err.statusCode,
        message: err.message,
        data: null,
        stack_trace: err.stack,
        status: "Error",
      });
    } else {
      if (err.isOperational) {
        res.status(err.statusCode).json({
          code: err.statusCode,
          message: err.message,
          data: null,
          status: "Error",
        });
      } else {
        console.log(err);
        res.status(err.statusCode).json({
          code: err.statusCode,
          status: "Error",
          message: "Something Went Wrong Try Again Later",
          data: null,
        });
      }
    }
  }

  static success(res: Response, data: any, message: string, code: number) {
    res.status(code).json({
      code: code,
      message: message,
      data: data,
      status: "Success",
    });
  }
}

export default AppResponse;
