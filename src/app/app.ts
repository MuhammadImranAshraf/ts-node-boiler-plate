import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import logging from "utils/logging.util";
import bodyParser from "body-parser";
import tryCatchAsync from "utils/try_catch.util";
import { statusCode } from "utils/status_code.util";
import v1Routes from "v1/routes/v1.routes";
import AppError from "utils/app_error.util";
import AppErrorHandler from "utils/error_handler.util";
const app = express();

const NAMESPACE = "Server";

/** Log the request */
app.use(
  tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    /** Log the req */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    next();
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Rules of our API */
app.use(
  tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(statusCode.success).json({});
    }
    next();
  })
);

app.use("/api/v1", v1Routes);

app.all(
  "*",
  tryCatchAsync(async (req: Request, res: Response, next: NextFunction) =>
    next(new AppError("Api Route Not Found", 404))
  )
);

app.use(AppErrorHandler);
export default app;
