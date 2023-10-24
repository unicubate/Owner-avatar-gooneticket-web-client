import { PaginationResponse } from "@/utils/pagination-item";

export type ResponseMembershipModel = {
  value: Array<MembershipModel>;
} & PaginationResponse;

export type MembershipModel = {
  createdAt: Date;
  id: string;
  title: string;
  status: string;
  organizationId: string;
  description: string;
  month: number;
  price: number;
  messageWelcome: string;
  currencyId: string;
  userId: string;
  uploadsImage: any;
  uploadsFile: any;
  currency: {
    code: string;
    symbol: string;
  };
};

export type MembershipFormModel = {
  title: string;
  description: string;
  month: number;
  price: number;
  messageWelcome: string;
  attachment: any;
  imageList: any;
  newImageLists: any;
  fileList: any;
  newFileLists: any;
};
