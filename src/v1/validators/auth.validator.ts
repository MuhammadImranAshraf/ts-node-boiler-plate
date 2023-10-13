import Joi, { ObjectSchema } from "joi";
import { ICustomer } from "v1/interfaces/customer.interface";

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

class AuthValidator {
  static login(data: ICustomer) {
    const schema = Joi.object<ICustomer>({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(5).required(),
    });
    return schema.validate(data, options);
  }
  static register(data: any) {
    const schema = Joi.object<ICustomer>({
      fullName: Joi.string().trim().min(3).required(),
      gender: Joi.string().trim().required(),
      email: Joi.string().trim().email(),
      phone: Joi.object({
        number: Joi.string().trim().min(7).optional(),
        country: Joi.string().trim().min(2).optional(),
        dialingCode: Joi.string().trim().min(2).optional(),
      }).optional(),
      address: Joi.object({
        title: Joi.string().trim().min(3).optional(),
        street: Joi.string().trim().optional(),
        detail: Joi.string().trim().optional(),
        additionalInfo: Joi.string().trim().optional(),
        postalCode: Joi.string().trim().min(5).optional(),
        city: Joi.string().trim().min(2).optional(),
        country: Joi.string().trim().min(2).optional(),
      }),
      password: Joi.string().min(5),
    });
    return schema.validate(data, options);
  }
}

export default AuthValidator;
