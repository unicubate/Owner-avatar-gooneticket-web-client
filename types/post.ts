import { PaginationResponse } from "@/utils/pagination-item";

export const arrayWhoCanSees = [
  { id: "1", name: "PUBLIC" },
  { id: "2", name: "MEMBERSHIP" },
];

export type PostType = "AUDIO" | "VIDEO" | "ARTICLE" | "GALLERY";

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
  whoCanSee: string;
  type: PostType;
  allowDownload: true;
  description: string;
  totalComment: number;
  totalLike: number;
  uploadsImage: any;
  uploadsFile: any;
  profile: {
    color: string;
    email: string;
    image: string;
    username: string;
    userId: string;
    fullName: string;
    enableShop: boolean;
    galleryShop: boolean;
    enableCommission: boolean;
    lastName: string;
    firstName: string;
  };
};

export type PostFormModel = {
  description: string;
  title: string;
  whoCanSee: string;
  userId: string;
  image: string;
  urlMedia: string;
  allowDownload: string;
  enableUrlMedia: string;
  isLike: number;
  type: PostType;
  attachment: any;
  imageList: any;
  newImageLists: any;
  fileList: any;
  newFileLists: any;
};
