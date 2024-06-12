import { ModelType, PaginationResponse } from '@/utils/paginations';
import { ProfileItemModel } from './profile';

export type ResponseContributorModel = {
  value: Array<ContributorModel>;
} & PaginationResponse;

export const roleContributors = [
  { id: '1', name: 'ADMIN' },
  { id: '2', name: 'MODERATOR' },
];

export type ContributorStatus =
  | 'CONTRIBUTOR'
  | 'INVITED-CONTRIBUTOR'
  | 'NEW-CONTRIBUTOR';

export type ContributorRole = 'ADMIN' | 'MEMBER' | 'SUPERADMIN' | 'MODERATOR';

export type ContributorModel = {
  createdAt: Date;
  id: string;
  userId: string;
  type: ModelType;
  userCreatedId: string;
  confirmedAt: string;
  profile: ProfileItemModel;
  status: ContributorStatus;
  role: {
    name: ContributorRole;
  };
};

export type ContributorFormModel = {
  action: 'INVITED' | 'NEW-CONTRIBUTOR' | 'UPDATE-CONTRIBUTOR';
  email?: string;
  userId?: string;
  role: ContributorRole;
  firstName?: string;
  lastName?: string;
};

export type ConfirmContributorFormModel = {
  passwordConfirm?: string;
  password?: string;
  contributorId: string;
  token: string;
  firstName?: string;
  lastName?: string;
  contributorStatus: ContributorStatus;
};
