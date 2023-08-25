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
  slug: string;
  status: boolean;
  title: string;
  whoCanSee: string;
  allowDownload: true;
  image: string;
  description: string;
  totalComment: number;
  totalLike: number;
  profile: {
    color: string;
    email: string;
    image: string;
    username: string;
    userId: string;
    fullName: string;
    lastName: string;
    firstName: string;
  };
};

export type ProductFormModel = {
  description: string;
  title: string;
  whoCanSee: string;
  userId: string;
  image: string;
  allowDownload: string;
  isLike: number;
  attachments: any;
  attachment: any;
  categories: any;
  fileList: any;
  newFileLists: any
};
