import { PaginationResponse } from "@/utils/pagination-item";

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
  uploadsImage: any;
  uploadsFile: any;
  profile: {
    color: string;
    email: string;
    image: string;
    userId: string;
    fullName: string;
    lastName: string;
    firstName: string;
  };
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
  attachment: any;
  newFileLists: any;
  imageList: any;
  newImageLists: any;
  messageAfterPayment?: string;
};
