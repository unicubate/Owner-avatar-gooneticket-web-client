import { PaginationResponse } from "@/utils/pagination-item";

export type ResponseCommentModel = {
  value: Array<CommentModel>;
} & PaginationResponse;

export type CommentModel = {
  createdAt: Date;
  id: string;
  description: string;
  postId: string;
  productId: string;
  userId: string;
  profile: {
    username: string;
    color: string;
    email: string;
    image: string;
    userId: string;
    fullName: string;
    lastName: string;
    firstName: string;
  };
};

export type CommentFormModel = {
  description: string;
  postId: string;
  productId: string;
  userId: string;
};
