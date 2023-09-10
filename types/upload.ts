export type UploadFolderType =
  | "posts"
  | "galleries"
  | "products"
  | "commissions";

export type UploadModel = {
  createdAt: Date;
  uid: string;
  name: string;
  status: string;
  url: string;
  productId: string;
};
