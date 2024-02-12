import { PaginationResponse } from '@/utils/pagination-item';
import { ProfileItemModel } from './profile.type';
import { UploadModel } from './upload';

export type ResponseCommissionModel = {
  value: Array<CommissionModel>;
} & PaginationResponse;

export type CommissionModel = {
  createdAt: Date;
  id: string;
  title: string;
  image: string;
  urlMedia: string;
  price: string;
  organizationId: string;
  description: string;
  messageAfterPayment: string;
  status: string;
  currencyId: string;
  userId: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  priceDiscount: string;
  enableDiscount?: boolean;
  uploadsImages: Array<UploadModel>;
  uploadsFiles: Array<UploadModel>;
  profile: ProfileItemModel;
};

export type CommissionFormModel = {
  description: string;
  title: string;
  userId: string;
  image: string;
  price?: string;
  urlMedia: string;
  limitSlot: number;
  enableLimitSlot: boolean;
  allowDownload: string;
  discountId: string;
  attachment: any;
  enableDiscount: boolean;
  newFileLists: any;
  imageList: any;
  newImageLists: any;
  messageAfterPayment?: string;
};
