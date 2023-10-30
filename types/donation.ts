import { PaginationResponse } from "@/utils/pagination-item";
import { ColorType } from "./profile.type";

export type DonationModel = {
  createdAt: Date;
  id?: string;
  title: string;
  price: number;
  description: string;
  messageWelcome: string;
  userId?: string;
};

export type DonationFormModel = {
  title: string;
  price: number;
  description: string;
  messageWelcome: string;
  userId?: string;
};
