import { ObjectId } from "mongoose";

interface IPriceDetails {
  brutto?: number;
  netto?: number;
  vat?: number;
  currencySign?: string;
  discountType?: string; // 'promoCode' or 'domain specific email' or 'referral'
  discountCode?: string; // can add 'promo code' or 'company name if domain specific' or 'referral code'
  discount?: number;
}

interface IPaymentDetails {
  cardID?: String;
  brand?: String;
  last4?: String;
}

interface IMealInfo {
  _id?: ObjectId | string;
  quantity?: number;
  price?: number;
  currencySign?: string;
}

interface IOrder {
  _id?: ObjectId | string;
  orderID?: string;
  priceDetails?: IPriceDetails;
  userID?: ObjectId | string;
  isBowlReturn?: boolean; //default false
  paymentStatus?: string; // "paid" , "refund",
  currentStatus?: string; // "pending" , "onWay" , "delivered" , "cancelled"
  paymentDetail?: IPaymentDetails;
  mealInfo?: IMealInfo;
  additionalInfo?: string[];
  deliverySlot?: Date;
  deliveredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IOrder };
