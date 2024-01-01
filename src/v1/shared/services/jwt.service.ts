import jwt from "jsonwebtoken";
import config from "config";
import { IAuthUserPayload } from "../interfaces/auth_user.interface";

export const AuthTokenService = {
  verify: (token: string): Promise<IAuthUserPayload> => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        config.get("jwt")["secret"] as string,
        (err, decoded) => {
          if (err) {
            return reject(err);
          }
          return resolve(decoded as IAuthUserPayload);
        }
      );
    });
  },
  sign: (payload: IAuthUserPayload): string => {
    return jwt.sign(payload, config.get("jwt")["secret"] as string, {
      expiresIn: config.get("jwt")["expiresIn"],
    });
  },
};
