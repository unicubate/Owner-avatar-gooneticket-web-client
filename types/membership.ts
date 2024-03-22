import { PaginationResponse } from '@/utils/paginations';
import { ProfileItemModel } from './profile.type';
import { UploadModel } from './upload';

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
  uploadsImages: Array<UploadModel>;
  uploadsFiles: Array<UploadModel>;
  currency: {
    code: string;
    symbol: string;
  };
  profile: ProfileItemModel;
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
