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
  description: boolean;
  attachment: any;
};
