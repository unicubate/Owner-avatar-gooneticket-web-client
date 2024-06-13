import { ModelType, PaginationResponse } from '@/utils/paginations';
import { KeyAsString } from '@/utils/utils';
import { ProductModel } from './product';
import { ProfileItemModel } from './profile';
import { UploadModel } from './upload';

export type ResponseOrderItemModel = {
  value: Array<OrderItemModel>;
} & PaginationResponse;

export type StatusOderProduct =
  | 'PENDING'
  | 'ACCEPTED'
  | 'OR_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export const statusOderProductLists: KeyAsString = {
  PENDING: 'info',
  ACCEPTED: 'success',
  CANCELLED: 'danger',
};

export const statusOderItemArray = [
  { id: 'PENDING', name: 'PENDING' },
  { id: 'ACCEPTED', name: 'ACCEPTED' },
  { id: 'DELIVERED', name: 'DELIVERED' },
  { id: 'CANCELLED', name: 'CANCELLED' },
];

export type OrderItemModel = {
  createdAt: Date;
  confirmedAt: Date;
  id: string;
  isExpired: boolean;
  orderNumber: string;
  quantity: string;
  percentDiscount: string;
  price: string;
  priceDiscount: string;
  organizationBuyerId: string;
  organizationSellerId: string;
  model: ModelType;
  status: StatusOderProduct;
  currency: string;
  productId: string;
  orderId: string;
  userId: string;
  priceName: string;
  address: {
    fullName: string;
    email: string;
  };
  profile: ProfileItemModel;
  organizationSeller: { name: string; image: string };
  profileSeller: ProfileItemModel;
  product: ProductModel;
  uploadsImages: Array<UploadModel>;
  uploadsFiles: Array<UploadModel>;
};

export type OrderModel = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  id: string;
  orderNumber: string;
  totalPriceDiscount: number;
  totalPriceNoDiscount: number;
  currency: string;
  address: {
    id: string;
    cap: string;
    city: string;
    phone: string;
    region: string;
    country: string;
    address: string;
    fullName: string;
  };
  userId: string;
};
export interface OrderItemFormModel {
  status: StatusOderProduct;
}
