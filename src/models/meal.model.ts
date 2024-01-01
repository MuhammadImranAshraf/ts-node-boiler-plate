import mongoose from "mongoose";
import { IMeal } from "v1/interfaces/meal.interface";

const TranslationSchema = new mongoose.Schema({}, { strict: false });

const MealSchema = new mongoose.Schema<IMeal>(
  {
    mealID: {
      type: String,
      required: false,
    },
    mealImage: {
      type: String,
      required: false,
    },
    title: TranslationSchema,
    description: TranslationSchema,
    ingredients: TranslationSchema,
    nutrition: TranslationSchema,
    allergies: TranslationSchema,
    tags: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    currencySign: {
      type: String,
      default: "€",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMeal>("Meal", MealSchema);
