import { NextFunction, Request, Response } from "express";
import validationChecker from "utils/joi_error_checker.util";
import AppResponse from "utils/response.util";
import { statusCode } from "utils/status_code.util";
import tryCatchAsync from "utils/try_catch.util";
import { transformCustomer } from "v1/dtos/customer.dto";
import { ICustomer } from "v1/interfaces/customer.interface";
import CustomerRepository from "v1/repositories/customer.repository";
import AuthValidator from "v1/validators/auth.validator";

class AuthController {
  private readonly customerRepo: CustomerRepository;

  constructor() {
    this.customerRepo = new CustomerRepository();
  }

  signUp = tryCatchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const validationResult = AuthValidator.register(req.body as ICustomer);
      validationChecker(validationResult, next);

      const payload = validationResult.value;
      const customer = await this.customerRepo.create(payload);
      const jwtToken = this.customerRepo.generateAuthToken(customer);

      const response_data = { jwtToken, customer: transformCustomer(customer) };

      AppResponse.success(
        res,
        response_data,
        "welcome to Movers Report",
        statusCode.created
      );
    }
  );
}

export default AuthController;
