import { NextStep } from './user.type';

export type ColorType = 'indigo' | 'red' | 'sky';

export const arrayColors = [
  { id: '2', name: 'indigo' },
  { id: '3', name: 'red' },
  // { id: "4", name: "green" },
];

export type ProfileFormModel = {
  fullName: string;
  phone: string;
  firstAddress: string;
  secondAddress: string;
  birthday: Date;
  currencyId: string;
  image: string;
  color: string;
  url: string;
  enableCommission: boolean;
  enableShop: boolean;
  enableGallery: boolean;
};

export type NextStepProfileFormModel = {
  birthday: Date;
  username: string;
  url?: string;
  currencyId: string;
  userId?: string;
  nextStep?: NextStep;
};

export type ProfileModel = {
  id: string;
  color: ColorType;
  firstName: string;
  lastName: string;
  countryId: string;
  fullName: string;
  image: string;
  url: string;
  userId: string;
  description: string;
  enableCommission: boolean;
  enableShop: boolean;
  enableGallery: boolean;
  currency: {
    code: string;
    name: string;
    amount: number;
    symbol: string;
  };
};

export type CurrencyModel = {
  id: string;
  name: string;
  code: string;
  symbol: string;
  amount: number;
};

export type ProfileItemModel = {
  id: string;
  url: string;
  color: ColorType;
  email: string;
  image: string;
  username: string;
  userId: string;
  fullName: string;
  description: string;
  enableShop: boolean;
  galleryShop: boolean;
  enableCommission: boolean;
  lastName: string;
  firstName: string;
  countryId: string;
};
