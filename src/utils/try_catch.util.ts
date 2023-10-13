import { NextFunction, Response } from "express";
import IAuthenticatedRequest from "v1/types/auth_request";

const tryCatchAsync =
  (fn: Function) =>
  (req: IAuthenticatedRequest, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next).catch(next));

export default tryCatchAsync;
