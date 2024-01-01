import bcryptjs from "bcryptjs";
import { NextFunction } from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import { IUser } from "v1/interfaces/user.interface";

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const PhoneSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  dialingCode: {
    type: String,
    required: true,
  },
});

const AddressSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: false,
  },
  detail: {
    type: String,
    required: false,
  },
  additionalInfo: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  lat: {
    type: Number,
    required: false,
  },
  lng: {
    type: Number,
    required: false,
  },
});

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    stripeID: {
      type: String,
    },
    passwordChangedAt: { type: Number },
    passwordResetToken: { type: Number },
    passwordTokenExpiry: { type: Number },
    isTokenVerified: { type: Boolean },
    phone: PhoneSchema,
    address: AddressSchema,
    profileImage: {
      type: String,
    },
    tokens: [String],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (
  password: string,
  user_password: string
) {
  return await bcryptjs.compare(password, user_password);
};

UserSchema.methods.hasPasswordChanged = function (token_issued_date: number) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = this.passwordChangedAt.getTime() / 1000;
    10;
    return token_issued_date < changedTimeStamp;
  }
  return false;
};

UserSchema.methods.createPasswordResetToken = function () {
  // const resetToken = crypto.randomBytes(32).toString("hex");
  // this.passwordResetToken = crypto
  //   .createHash("sha256")
  //   .update(resetToken)
  //   .digest("hex");

  this.passwordResetToken = Math.floor(1000 + Math.random() * 9000);

  this.passwordTokenExpiry = Date.now() + 3600000;
  return this.passwordResetToken;
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
