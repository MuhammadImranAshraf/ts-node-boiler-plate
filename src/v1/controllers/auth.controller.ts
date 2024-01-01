import { NextFunction, Request, Response } from "express";
import AppError from "utils/app_error.util";
import AppResponse from "utils/response.util";
import { statusCode } from "utils/status_code.util";
import tryCatchAsync from "utils/try_catch.util";
import { UserDTOsApp } from "v1/dtos/user.dto";
import { IUser } from "v1/interfaces/user.interface";
import UserRepository from "v1/repositories/user.repository";
import { IARequest, IVRequest } from "v1/types/auth_request";
import nodemailer from "nodemailer";
import { AuthTokenService } from "v1/shared/services/jwt.service";
import sendEmail from "v1/shared/services/email.service";

class AuthController {
  private readonly userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  register = tryCatchAsync(
    async (req: IVRequest, res: Response, next: NextFunction) => {
      const payload = req.validatedBody as IUser;

      const user = await this.userRepo.create(payload);
      const jwtToken = await this.userRepo.generateAuthToken(user);
      const response_data = { jwtToken, user: UserDTOsApp(user) };

      sendEmail({ user, template: "welcome" });

      AppResponse.success(
        res,
        response_data,
        "welcome to himonk food delivery",
        statusCode.created
      );
    }
  );

  login = tryCatchAsync(
    async (req: IVRequest, res: Response, next: NextFunction) => {
      const payload = req.validatedBody;
      const user = await this.userRepo.findByEmail(payload.email);
      if (!user)
        throw new AppError("Invalid Login Credentials", statusCode.badRequest);

      if (
        user &&
        !(await user.isPasswordCorrect(payload.password, user.password))
      ) {
        throw new AppError("Invalid Login Credentials", statusCode.badRequest);
      }

      const jwtToken = await this.userRepo.generateAuthToken(user);

      const response_data = { jwtToken, user: UserDTOsApp(user) };
      AppResponse.success(res, response_data, "", statusCode.success);
    }
  );

  isLoggedIn = tryCatchAsync(
    async (req: IARequest, res: Response, next: NextFunction) => {
      let token: string;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      try {
        let decoded = await AuthTokenService.verify(token as string);

        const user = await this.userRepo.findById(decoded._id);

        if (!user || !user?.tokens.includes(token))
          throw new AppError("Invalid auth token", 401);

        req.user = user;
        next();
      } catch (e) {
        return next(new AppError("unauthorized", 401));
      }
    }
  );

  forgotPassword = tryCatchAsync(
    async (req: IVRequest, res: Response, next: NextFunction) => {
      const { email } = req.validatedBody as IUser;
      const user = await this.userRepo.findByEmail(email);

      if (!user) throw new AppError("User not found", statusCode.badRequest);

      if (user?.passwordResetToken) {
        const timeDiff = user.passwordTokenExpiry - Date.now();

        const timeDiffInSeconds = Math.floor(timeDiff / 1000);

        if (timeDiffInSeconds > 0) {
          return AppResponse.success(
            res,
            { countDown: timeDiffInSeconds },
            "please wait a bit to request a new token",
            200
          );
        }
      }

      const passwordResetToken = await this.userRepo.createPasswordResetToken(
        user
      );

      console.log({ passwordResetToken });

      sendEmail({
        user,
        template: "send-otp",
        extraData: { otp: passwordResetToken },
      });

      const response_data = {};
      AppResponse.success(
        res,
        response_data,
        "Please check your email for the OTP to reset your password.",
        statusCode.success
      );
    }
  );

  verifyPasswordToken = tryCatchAsync(
    async (req: IVRequest, res: Response, next: NextFunction) => {
      const { email, passwordResetToken } = req.validatedBody as IUser;

      console.log({ passwordResetToken });

      const user = await this.userRepo.findByEmail(email);

      if (
        !user ||
        user.passwordResetToken !== passwordResetToken ||
        user?.isTokenVerified ||
        user?.passwordTokenExpiry < Date.now()
      )
        throw new AppError("Invalid or Expire OTP", statusCode.badRequest);

      await this.userRepo.update(user._id, { isTokenVerified: true });
      const response_data = {};
      AppResponse.success(
        res,
        response_data,
        "OTP verified",
        statusCode.success
      );
    }
  );

  resetPassword = tryCatchAsync(
    async (req: IVRequest, res: Response, next: NextFunction) => {
      const { email, password } = req.validatedBody as IUser;
      const user = await this.userRepo.findByEmail(email);
      if (!user) throw new AppError("User not found", statusCode.badRequest);

      if (!user.isTokenVerified) {
        throw new AppError(
          "Please verify your token to reset password",
          statusCode.unauthorized
        );
      }
      const upUser = await this.userRepo.updatePassword(user._id, password);

      const jwtToken = await this.userRepo.generateAuthToken(upUser);
      const response_data = { jwtToken, user: UserDTOsApp(upUser) };

      // Send email with reset instructions
      sendEmail({ user, template: "password-reset" });

      AppResponse.success(
        res,
        response_data,
        "password updated successfully",
        statusCode.success
      );
    }
  );

  logout = tryCatchAsync(
    async (req: IARequest, res: Response, next: NextFunction) => {
      await this.userRepo.logout(req.user);
      const response_data = {};
      AppResponse.success(res, response_data, "log out", statusCode.success);
    }
  );

  splash = tryCatchAsync(
    async (req: IARequest, res: Response, next: NextFunction) => {
      const response_data = { user: UserDTOsApp(req.user) };
      AppResponse.success(res, response_data, "splash", statusCode.success);
    }
  );
}

export default AuthController;
