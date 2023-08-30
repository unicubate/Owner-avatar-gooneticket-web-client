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
  urlMedia: string;
  status: boolean;
  title: string;
  whoCanSee: string;
  type: PostType;
  allowDownload: true;
  image: string;
  description: string;
  totalComment: number;
  totalLike: number;
  profile: {
    color: string;
    email: string;
    image: string;
    username: string;
    userId: string;
    fullName: string;
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
  isLike: number;
  type: PostType;
  attachment: any;
  categories: any;
};
