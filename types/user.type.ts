import { ColorType, ProfileModel } from './profile.type';

export type NextStep =
  | 'SETTING_PROFILE'
  | 'SETTING_INTEREST'
  | 'CONFIRM_EMAIL'
  | 'COMPLETE_REGISTRATION';

export type UserLoginFormModel = {
  email: string;
  password: string;
};

export type UserRegisterFormModel = {
  email: string;
  confirm: boolean;
  password: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  nextStep?: NextStep;
};

export type UserResetPasswordFormModel = {
  newPassword: string;
  token?: string;
  passwordConfirm: string;
};

export type UserModel = {
  accessToken: string;
  confirmedAt: string;
  createdAt: Date;
  email: string;
  id: string;
  username: string;
  organizationId: string;
  profileId: string;
  donation: {
    amount: number;
    count: number;
  };
  donationUser: {
    id: string;
    userId: string;
    description: string;
    price: number;
  };
  membership: {
    amount: number;
    count: number;
  };
  product: {
    amount: number;
    count: number;
  };
  commission: {
    count: number;
  };
  post: {
    count: number;
  };
  gallery: {
    count: number;
  };
  profile: ProfileModel;
  refreshToken: string;
  nextStep: NextStep;
  token: string;
  totalFollower: number;
  totalSubscribe: number;
  totalFollowing: number;
};

export type UserVisitorModel = {
  organizationId: string;
  id?: string;
};
username: 'bokin-1659';
export type UserForgotPasswordFormModel = {
  email: string;
};
