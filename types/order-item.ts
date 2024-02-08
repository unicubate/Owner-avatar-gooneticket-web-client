import { ModelType } from '@/utils/pagination-item';
import { KeyAsString } from '@/utils/utils';
import { CommissionModel } from './commission';
import { ProductModel } from './product';
import { ProfileItemModel } from './profile.type';
import { UploadModel } from './upload';

export type ResponseOrderItemModel = {
  value: Array<OrderItemModel>;
};

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
  id: string;
  orderNumber: string;
  quantity: string;
  percentDiscount: string;
  price: string;
  priceDiscount: string;
  organizationBeyerId: string;
  organizationSellerId: string;
  model: ModelType;
  status: StatusOderProduct;
  currency: string;
  commissionId: null;
  productId: string;
  orderId: string;
  userId: string;
  profile: ProfileItemModel;
  product: ProductModel;
  commission: CommissionModel;
  uploadsImages: Array<UploadModel>;
  uploadsFiles: Array<UploadModel>;
};

export interface OrderItemFormModel {
  status: StatusOderProduct;
}
