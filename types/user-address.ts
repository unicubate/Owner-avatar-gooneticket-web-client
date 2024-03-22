import { PaginationResponse } from '@/utils/paginations';

export type ResponseUserAddressModel = {
  value: Array<UserAddressModel>;
} & PaginationResponse;

export type UserAddressModel = {
  userId: string;
  firstName: string;
  lastName: string;
  city: string;
  cap: string;
  country: string;
  phone: string;
  region: string;
  street1: string;
  street2: string;
  isUpdated: boolean;
  organizationId: string;
  createdAt: Date;
  id: string;
};

export type UserAddressFormModel = {
  firstName: string;
  lastName: string;
  city: string;
  cap: string;
  country: string;
  phone: string;
  region: string;
  street1: string;
  street2: string;
  organizationId: string;
  userAddressId: string;
};
