export type UploadFolderType =
  | 'posts'
  | 'galleries'
  | 'products'
  | 'commissions'
  | 'memberships'
  | 'profiles';

export type UploadModel = {
  createdAt: Date;
  uid: string;
  name: string;
  status: string;
  url: string;
  size: number;
  productId: string;
  path: string;
};
