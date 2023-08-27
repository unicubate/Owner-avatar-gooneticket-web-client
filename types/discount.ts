import { PaginationResponse } from "@/utils/pagination-item";

export type ResponseDiscountModel = {
  value: Array<DiscountModel>;
} & PaginationResponse;

export type DiscountModel = {
  createdAt: Date;
  id: string;
  code: string;
  description: string;
  percent: string;
  isActive: boolean;
  expiredAt: Date;
  startedAt: Date;
  userId: string;
};

export type DiscountFormModel = {
  code: string;
  description: string;
  percent: string;
  isActive: boolean;
  expiredAt: Date;
  startedAt: Date;
};
