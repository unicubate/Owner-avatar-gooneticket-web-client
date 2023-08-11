import { PaginationResponse } from "@/utils/pagination-item";

export type ResponseGalleryModel = {
  value: Array<GalleryModel>;
} & PaginationResponse;

export type GalleryModel = {
  id: string;
  createdAt: Date;
  description: string;
  title: string;
  allowDownload: string;
  whoCanSee: string;
  userId: string;
  path: string;
};

export type GalleryFormModel = {
  title: string;
  whoCanSee: string;
  allowDownload: string;
  description: string;
  attachment: any;
};
