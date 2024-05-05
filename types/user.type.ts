import { PaginationResponse } from '@/utils/paginations';
import { ProfileModel } from './profile.type';

export type ResponseUserModel = {
  value: Array<UserModel>;
} & PaginationResponse;

export type UserStatus = 'CLIENT' | 'PROPONENT';

export type NextStep =
  | 'SETTING_PROFILE'
  | 'SETTING_INTEREST'
  | 'CONFIRM_EMAIL'
  | 'COMPLETE_REGISTRATION';

export type UserLoginFormModel = {
  email: string;
  password: string;
};

export type UserLoginPhoneFormModel = {
  phone: string;
  code: string;
};

export type UserRegisterFormModel = {
  email: string;
  confirm: boolean;
  password: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  birthday?: string;
};

export type UserResetPasswordFormModel = {
  password: string;
  token?: string;
  passwordConfirm: string;
};

export type UserUpdatePasswordFormModel = {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
};

export type UserModel = {
  accessToken: string;
  confirmedAt: Date;
  createdAt: Date;
  emailConfirmedAt: Date;
  phoneConfirmedAt: Date;
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

export type IpLocationModal = {
  ipLocation: {
    status: string;
    continent: string;
    continentCode: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    district: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    offset: number;
    currency: string;
    isp: string;
    org: string;
    as: string;
    asname: string;
    reverse: string;
    mobile: boolean;
    proxy: boolean;
    hosting: boolean;
    query: string;
  };
};

export type UserVisitorModel = {
  organizationId: string;
  username?: string;
  id?: string;
};

export type UserVerifyTokenModel = {
  userId: string;
  contributorId: string;
  contributorStatus: 'CONTRIBUTOR' | 'INVITED-CONTRIBUTOR' | 'NEW-CONTRIBUTOR';
  guest: {
    lastName: string;
    firstName: string;
  };
  user: {
    email: string;
    organizationName: string;
    firstName: string;
    lastName: string;
  };
};

export type UserForgotPasswordFormModel = {
  email: string;
};
