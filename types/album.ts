import { PaginationResponse } from "@/utils/pagination-item";

export type ResponseAlbumModel = {
  value: Array<AlbumModel>;
} & PaginationResponse;

export type AlbumModel = {
  createdAt: Date;
  id: string;
  name: string;
  description: string;
  slug: string;
  userId: string;
  organizationId: string;
};

export type AlbumFormModel = {
  name: string;
  description: string;
};
