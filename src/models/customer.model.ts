import { NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import { ICustomer } from "v1/interfaces/customer.interface";
import bcryptjs from "bcryptjs";

export const customerSchema: Schema = new Schema({
  fullName: {
    type: String,
    default: "",
  },
  gender: { type: String },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    number: String,
    country: String,
    dialingCode: String,
  },
  address: {
    title: String,
    street: String,
    detail: String,
    additionalInfo: String,
    postalCode: String,
    city: String,
    country: String,
  },
  password: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

customerSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 8);
  next();
});

customerSchema.methods.isPasswordCorrect = function (
  password: string,
  inputPassword: string
) {
  return bcryptjs.compare(password, inputPassword);
};

export default mongoose.model<ICustomer>("Customer", customerSchema);
