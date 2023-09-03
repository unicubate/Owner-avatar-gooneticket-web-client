import { NextStep } from "./user.type";

export type ColorType = "gray" | "indigo" | "red" | "sky";

export const arrayColors = [
  { id: "1", name: "gray" },
  { id: "2", name: "indigo" },
  { id: "3", name: "red" },
  { id: "4", name: "blue" },
  // { id: "5", name: "green" },
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
