import { Request } from "express";
import { IUser } from "v1/interfaces/user.interface";

interface IVRequest extends Request {
  validatedBody?: any;
  validatedParams?: any;
  validatedQuery?: any;
}

interface IARequest extends IVRequest {
  user?: IUser;
  validatedBody?: any;
  validatedParams?: any;
  validatedQuery?: any;
}

export { IARequest, IVRequest };
