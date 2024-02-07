import { PaginationResponse } from '@/utils/pagination-item';
import { ProfileItemModel } from './profile.type';

export type ResponseFollowModel = {
  value: Array<FollowModel>;
} & PaginationResponse;

export type FollowModel = {
  id: string;
  createdAt: Date;
  followerId: string;
  profile: ProfileItemModel;
};
