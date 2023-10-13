import jwt from "jsonwebtoken";
import { IAuthenticatedUserPayload } from "./interfaces/auth_user.interface";
import config from "config";

export const AuthTokenService = {
  verify: (token: string): Promise<IAuthenticatedUserPayload> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.jwt.secret as string, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        return resolve(decoded as IAuthenticatedUserPayload);
      });
    });
  },
  sign: (payload: IAuthenticatedUserPayload): string => {
    return jwt.sign(payload, config.jwt.secret as string, {
      expiresIn: config.jwt.expiry,
    });
  },
};
