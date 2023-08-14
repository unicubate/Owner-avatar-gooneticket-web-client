import { PaginationResponse } from "@/utils/pagination-item";

export const arrayWhoCanSees = [
  { id: "1", name: "PUBLIC" },
  { id: "2", name: "MEMBERSHIP" },
];

type PostType = "AUDIO" | "ARTICLE" | "GALLERY";

export type ResponsePostModel = {
  value: Array<PostModel>;
} & PaginationResponse;

export type PostModel = {
  id: string;
  createdAt: Date;
  description: string;
  title: string;
  whoCanSee: string;
  userId: string;
  image: string;
  type: PostType;
};

export type PostFormModel = {
  description: string;
  title: string;
  whoCanSee: string;
  userId: string;
  image: string;
  type: PostType;
  attachment: any;
};
