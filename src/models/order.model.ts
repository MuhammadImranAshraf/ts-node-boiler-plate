import mongoose from "mongoose";
import { IOrder } from "v1/interfaces/order.interface";

const PriceDetailsSchema = new mongoose.Schema({
  brutto: {
    type: Number,
    required: false,
  },
  netto: {
    type: Number,
    required: false,
  },
  vat: {
    type: Number,
    required: false,
  },
  currencySign: {
    type: String,
    required: "€",
  },
  discountType: {
    type: String,
    required: false,
  },
  discountCode: {
    type: String,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
  },
});

const PaymentDetailsSchema = new mongoose.Schema({
  cardID: {
    type: String,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  last4: {
    type: String,
    required: false,
  },
});

const MealInfoSchema = new mongoose.Schema({
  mealID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  currencySign: {
    type: String,
    required: false,
  },
});

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    orderID: {
      type: String,
      required: false,
    },
    priceDetails: PriceDetailsSchema,
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
      required: false,
    },
    isBowlReturn: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      type: String,
      required: false,
    },
    currentStatus: {
      type: String,
      required: false,
    },
    paymentDetail: PaymentDetailsSchema,
    mealInfo: MealInfoSchema,
    additionalInfo: [
      {
        type: String,
      },
    ],
    deliverySlot: {
      type: Date,
      required: false,
    },
    deliveredAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);
export default mongoose.model<IOrder>("Order", OrderSchema);
