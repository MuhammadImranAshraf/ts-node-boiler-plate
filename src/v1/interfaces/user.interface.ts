import mongoose from "mongoose";
import { IAddress } from "./address.interface";
interface IPhone {
  number: string;
  countryCode: string;
  dialingCode: string;
}

// interface IUserMethods {
//   isPasswordCorrect(password: string, user_password: string): Promise<boolean>;
//   createPasswordResetToken(): string;
//   hasPasswordChanged(token_issued_date: number): boolean;
// }

interface IUser extends Partial<mongoose.Document> {
  _id?: string;
  fullName?: string;
  gender?: string;
  email?: string;
  password?: string;
  phone?: IPhone;
  address?: IAddress;
  stripeID?: string;
  profileImage?: string;
  tokens?: string[];
  passwordChangedAt?: number;
  passwordResetToken?: number;
  passwordTokenExpiry?: number;
  isTokenVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isPasswordCorrect?(password: string, user_password: string): Promise<boolean>;
  createPasswordResetToken?(): string;
  hasPasswordChanged?(token_issued_date: number): boolean;
}

export { IUser };
