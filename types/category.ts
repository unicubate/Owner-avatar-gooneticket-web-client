import { PaginationResponse } from "@/utils/pagination-item";

export type ResponseCategoryModel = {
  value: Array<CategoryModel>;
} & PaginationResponse;

export type CategoryModel = {
  createdAt: Date;
  id: string;
  name: string;
  description: string;
  slug: string;
  userId: string;
  organizationId: string;
};

export type CategoryFormModel = {
  name: string;
  description: string;
};
