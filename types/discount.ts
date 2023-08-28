import { PaginationResponse } from "@/utils/pagination-item";

export type ResponseDiscountModel = {
  value: Array<DiscountModel>;
} & PaginationResponse;

export type DiscountModel = {
  createdAt: Date;
  id: string;
  name: string;
  description: string;
  percent: string;
  expiredAt: Date;
  startedAt: Date;
  userId: string;
  isValid: boolean;
  enableExpiredAt: boolean;
};

export type DiscountFormModel = {
  name: string;
  percent: string;
  expiredAt: Date;
  startedAt: Date;
  description: string;
  enableExpiredAt: boolean;
};
