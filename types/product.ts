import { PaginationResponse } from "@/utils/pagination-item";

export const arrayWhoCanSees = [
  { id: "1", name: "PUBLIC" },
  { id: "2", name: "MEMBERSHIP" },
];

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
  priceNoDiscount: string;
  description: string;
  messageAfterPurchase: string;
  moreDescription: string;
  isChooseQuantity: boolean;
  isLimitSlot: boolean;
  limitSlot: string;
  status: string;
  userId: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  profile: {
    color: string;
    image: string;
    userId: string;
    fullName: string;
    lastName: string;
    username: string;
    firstName: string;
  };
  price: string;
};

export type ProductFormModel = {
  title: string;
  isChooseQuantity: boolean;
  urlMedia: string;
  price: number;
  messageAfterPurchase: string;
  description: string;
  limitSlot: number;
  isLimitSlot: boolean;
  attachments: any;
  attachment: any;
  fileList: any;
  newFileLists: any;
  imageList: any;
  newImageLists: any;
};
