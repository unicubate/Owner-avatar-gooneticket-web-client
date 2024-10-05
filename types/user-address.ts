import { PaginationResponse } from '@/utils/paginations';

export type ResponseUserAddressModel = {
  value: Array<UserAddressModel>;
} & PaginationResponse;

export type UserAddressModel = {
  fullName: string;
  city: string;
  cap: string;
  country: string;
  phone: string;
  address: string;
  email: string;
  userId: string;
  isUpdated: boolean;
  createdAt: Date;
  id: string;
};
