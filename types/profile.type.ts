import { NextStep } from "./user.type";

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
};

export type NextStepProfileFormModel = {
  birthday: Date;
  url?: string;
  currencyId: string;
  userId?: string;
  nextStep?: NextStep;
};

export type ProfileModel = {
  id: string;
  fullName: string;
  createdAt: Date;
  phone: Date;
  firstAddress: string;
  secondAddress: string;
  birthday: string;
  currencyId: string;
  image: string;
  color: string;
  url: string;
};

export type CurrencyModel = {
  id: string;
  name: string;
  code: string;
  symbol: string;
  amount: number;
};
