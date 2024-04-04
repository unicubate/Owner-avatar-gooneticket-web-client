import { PaginationResponse } from '@/utils/paginations';
import { ProfileItemModel } from './profile.type';
import { UploadModel } from './upload';

export const arrayWhoCanSees = [
  { id: '1', name: 'PUBLIC' },
  { id: '2', name: 'MEMBERSHIP' },
];

export const arrayStringWhoCanSees = ['MEMBERSHIP', 'PUBLIC'];

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
  uploadsImages: UploadModel[];
  uploadsFiles: UploadModel[];
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
  enableVisibility?: string;
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
