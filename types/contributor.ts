import { ModelType, PaginationResponse } from '@/utils/pagination-item';
import { ProfileItemModel } from './profile.type';

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
  profile: ProfileItemModel;
  role: {
    name: ContributorRole;
  };
};

export type ContributorFormModel = {
  action: 'INVITED' | 'CREATED-NEW';
  email?: string;
  userId?: string;
};
