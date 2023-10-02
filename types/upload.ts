export type UploadFolderType =
  | "posts"
  | "galleries"
  | "products"
  | "commissions"
  | "memberships";

export type UploadModel = {
  createdAt: Date;
  uid: string;
  name: string;
  status: string;
  url: string;
  productId: string;
  path: string;
};
