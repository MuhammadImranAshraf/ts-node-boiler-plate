import { Request } from "express";
import { ICustomer } from "v1/interfaces/customer.interface";

interface IAuthenticatedRequest extends Request {
  customer?: ICustomer;
}

export default IAuthenticatedRequest;
