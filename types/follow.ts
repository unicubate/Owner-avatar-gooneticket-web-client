import { PaginationResponse } from "@/utils/pagination-item";

export type ResponseFollowModel = {
  value: Array<FollowModel>;
} & PaginationResponse;

export type FollowModel = {
  id: string;
  createdAt: Date;
  followerId: string;
  profile: {
    color: string;
    email: string;
    username: string;
    image: string;
    userId: string;
    fullName: string;
    lastName: string;
    firstName: string;
  };
};

