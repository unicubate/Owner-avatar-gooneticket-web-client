import { ModelType, PaginationResponse } from "@/utils/pagination-item";

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
  color: string;
  fullName: string;
  email: string;
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
  organizationId: string;
  model: ModelType;
  description: string;
  postId: string;
  productId: string;
  userId: string;
};
