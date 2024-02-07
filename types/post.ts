import { PaginationResponse } from '@/utils/pagination-item';
import { ProfileItemModel } from './profile.type';

export const arrayWhoCanSees = [
  { id: '1', name: 'PUBLIC' },
  { id: '2', name: 'MEMBERSHIP' },
];

export type PostType = 'AUDIO' | 'VIDEO' | 'ARTICLE' | 'GALLERY';

export type WhoCanSeeType = 'PUBLIC' | 'MEMBERSHIP';

export type ResponsePostModel = {
  value: Array<PostModel>;
} & PaginationResponse;

export type PostModel = {
  createdAt: Date;
  id: string;
  slug: string;
  userId: string;
  urlMedia: string;
  status: boolean;
  title: string;
  organizationId: string;
  whoCanSee: WhoCanSeeType;
  type: PostType;
  allowDownload: true;
  description: string;
  totalComment: number;
  totalLike: number;
  uploadsImage: any;
  uploadsFile: any;
  isValidSubscribe: number;
  enableUrlMedia: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  profile: ProfileItemModel;
};

export type PostFormModel = {
  description?: string;
  title?: string;
  whoCanSee?: string;
  userId?: string;
  image?: string;
  urlMedia?: string;
  allowDownload?: string;
  enableUrlMedia?: string;
  categoryId?: string;
  albumId?: string;
  isLike?: number;
  type?: PostType;
  attachment?: any;
  imageList?: any;
  newImageLists?: any;
  fileList?: any;
  newFileLists?: any;
};

export type GetOnPostQueryModel = {
  postId?: string;
  type?: string;
  organizationId?: string;
  postSlug?: string;
  userVisitorId?: string;
};
