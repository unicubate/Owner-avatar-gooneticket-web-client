import { ModelType, PaginationResponse } from '@/utils/paginations';
import { ProfileItemModel } from './profile';
import { UploadModel } from './upload';

export const arrayWhoCanSees = [
  { id: '1', name: 'PUBLIC' },
  { id: '2', name: 'MEMBERSHIP' },
];

export const arrayProductTypes = [
  { id: '1', name: 'DIGITAL' },
  // { id: '2', name: 'PHYSICAL' },
];

export const modelProductArray = [
  { id: 'EVENT', name: 'EVENT', label: 'Event' },
  { id: 'PRODUCT', name: 'PRODUCT', label: 'Product' },
];

export type ProductType = 'DIGITAL' | 'PHYSICAL';

export type ResponseProductModel = {
  value: Array<ProductModel>;
} & PaginationResponse;

export type ProductModel = {
  createdAt: Date;
  expiredAt: Date;
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  sku: string;
  timeInit: string;
  timeEnd: string;
  address: string;
  city: string;
  whoCanSee: string;
  organizationId: string;
  urlMedia: string;
  productType: ProductType;
  description: string;
  messageAfterPayment: string;
  moreDescription: string;
  urlRedirect: string;
  enableUrlRedirect: boolean;
  enableChooseQuantity: boolean;
  enableLimitSlot: boolean;
  limitSlot: string;
  status: string;
  userId: string;
  model: ModelType;
  categoryId: string;
  totalComment: number;
  isExpired: boolean;
  country: {
    code: string;
    name: string;
  };
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  profile: ProfileItemModel;
  organization: { name: string; color: string };
  uploadImages: Array<UploadModel>;
  uploadFiles: Array<UploadModel>;
  price: string;
};

export type ProductFormModel = {
  title: string;
  enableChooseQuantity: boolean;
  urlMedia: string;
  price: number;
  timeEnd: string;
  timeInit: string;
  messageAfterPayment: string;
  description: string;
  whoCanSee: string;
  categoryId: string;
  city: string;
  address: string;
  countryId: string;
  expiredAt: Date;
  productType: ProductType;
  limitSlot: number;
  enableVisibility: boolean;
  enableLimitSlot: boolean;
  urlRedirect: string;
  model: ModelType;
  enableUrlRedirect: boolean;
  attachments: any;
  attachment: any;
  fileList: any;
  newFileLists: any;
  imageList: any;
  newImageLists: any;
};
