import { PaginationResponse } from "@/utils/pagination-item";
import { ColorType } from "./profile.type";

export const arrayWhoCanSees = [
  { id: "1", name: "PUBLIC" },
  { id: "2", name: "MEMBERSHIP" },
];

export const arrayProductTypes = [
  { id: "1", name: "PHYSICAL" },
  { id: "2", name: "DIGITAL" },
];

export type ProductType = 'DIGITAL' | 'PHYSICAL';

export type ResponseProductModel = {
  value: Array<ProductModel>;
} & PaginationResponse;

export type ProductModel = {
  createdAt: Date;
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  sku: string;
  urlMedia: string;
  productType: ProductType;
  priceNoDiscount: string;
  description: string;
  messageAfterPayment: string;
  moreDescription: string;
  enableChooseQuantity: boolean;
  enableLimitSlot: boolean;
  enableDiscount: boolean;
  limitSlot: string;
  status: string;
  userId: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  profile: {
    color: ColorType;
    image: string;
    userId: string;
    fullName: string;
    lastName: string;
    username: string;
    firstName: string;
  };
  uploadsImage: any;
  uploadsFile: any;
  discount: {
    isValid: boolean;
    percent: number;
    expiredAt: Date;
    enableExpiredAt: boolean;
  };
  price: string;
  priceDiscount: string;
};

export type ProductFormModel = {
  title: string;
  enableChooseQuantity: boolean;
  urlMedia: string;
  price: number;
  messageAfterPayment: string;
  description: string;
  discountId: string;
  whoCanSee: string;
  productType: ProductType;
  enableDiscount: boolean;
  limitSlot: number;
  enableLimitSlot: boolean;
  urlRedirect: string;
  enableUrlRedirect: boolean;
  attachments: any;
  attachment: any;
  fileList: any;
  newFileLists: any;
  imageList: any;
  newImageLists: any;
};
