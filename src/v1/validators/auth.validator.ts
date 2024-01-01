import Joi from "joi";
import { IUser } from "v1/interfaces/user.interface";

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

class AuthValidator {
  static login(data: IUser) {
    const schema = Joi.object<IUser>({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(5).required(),
    });
    return schema.validate(data, options);
  }
  static register(data: IUser) {
    const schema = Joi.object<IUser>({
      fullName: Joi.string().trim().min(3).required(),
      gender: Joi.string().trim().optional(),
      email: Joi.string().trim().email(),
      phone: Joi.object({
        number: Joi.string().trim().min(7).optional(),
        countryCode: Joi.string().trim().min(2).optional(),
        dialingCode: Joi.string().trim().min(2).optional(),
      }).optional(),
      // address: Joi.object({
      //   title: Joi.string().trim().min(3).optional(),
      //   street: Joi.string().trim().optional(),
      //   detail: Joi.string().trim().optional(),
      //   additionalInfo: Joi.string().trim().optional(),
      //   postalCode: Joi.string().trim().min(5).optional(),
      //   city: Joi.string().trim().min(2).optional(),
      //   country: Joi.string().trim().min(2).optional(),
      //   country: Joi.string().trim().min(2).optional(),
      // }),
      password: Joi.string().min(5),
    });
    return schema.validate(data, options);
  }
  static forgotPassword(data: IUser) {
    const schema = Joi.object<IUser>({
      email: Joi.string().trim().email().required(),
    });
    return schema.validate(data, options);
  }
  static verifyPasswordToken(data: IUser) {
    const schema = Joi.object<IUser>({
      email: Joi.string().trim().email().required(),
      passwordResetToken: Joi.number().required(),
    });
    return schema.validate(data, options);
  }

  static resetPassword(data: IUser) {
    const schema = Joi.object<IUser>({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(5).required(),
    });
    return schema.validate(data, options);
  }
}

export default AuthValidator;
