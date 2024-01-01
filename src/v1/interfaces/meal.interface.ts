import { ITranslation } from "./translation.interface";

interface IMeal {
  _id?: string;
  mealID?: string;
  mealImage?: string;
  title?: ITranslation;
  description?: ITranslation;
  ingredients?: ITranslation;
  nutrition?: ITranslation;
  allergies?: ITranslation;
  tags?: string[];
  price?: number;
  currencySign?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IMeal };
