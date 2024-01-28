import { ModelType, PaginationResponse } from '@/utils/pagination-item';

export type ResponseContributorModel = {
  value: Array<ContributorModel>;
} & PaginationResponse;

export type ContributorRole =
  | 'ADMIN'
  | 'MODERATOR'
  | 'EDITOR'
  | 'GHOST'
  | 'ANALYST';

export type ContributorModel = {
  createdAt: Date;
  id: string;
  userId: string;
  type: ModelType;
  userCreatedId: string;
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
  role: {
    name: ContributorRole;
  };
};

export type ContributorFormModel = {
  organizationId: string;
  model: ModelType;
  description: string;
  postId: string;
  productId: string;
  userId: string;
};
