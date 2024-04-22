import { PaginationResponse } from '@/utils/paginations';
import { ProfileItemModel } from './profile.type';

export type ResponseAffiliationModel = {
  value: Array<AffiliationModel>;
} & PaginationResponse;

export type AffiliationModel = {
  createdAt: Date;
  id: string;
  code: string;
  url: string;
  percent: number;
  description: string;
  expiredAt: string;
  productId: string;
  product: {
    title: string;
    slug: string;
  };
  profile: ProfileItemModel;
  organizationSellerId: string;
};

export type AffiliationFormModel = {
  email: string;
  productId: string;
  percent: number;
  description: string;
};
