import { PaginationResponse } from '@/utils/paginations';
import { ProfileItemModel } from './profile';

export type ResponseFollowModel = {
  value: Array<FollowModel>;
} & PaginationResponse;

export type FollowModel = {
  id: string;
  createdAt: Date;
  followerId: string;
  profile: ProfileItemModel;
};
