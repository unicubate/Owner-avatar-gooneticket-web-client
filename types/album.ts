import { PaginationResponse } from '@/utils/paginations';

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
  totalPost?: number;
};

export type AlbumFormModel = {
  name: string;
  description: string;
};
