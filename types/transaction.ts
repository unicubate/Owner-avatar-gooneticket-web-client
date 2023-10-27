import {
  ModelType,
  PaginationResponse,
  PaymentType,
} from "@/utils/pagination-item";

export type ResponseTransactionModel = {
  value: Array<TransactionModel>;
} & PaginationResponse;

export type ResponseStatisticsTransactionModel =
  Array<StatisticTransactionModel>;

export type StatisticTransactionModel = {
  model: ModelType;
  organizationId: string;
  statistic: {
    count: number;
    amount: number;
  };
};

export type TransactionModel = {
  id: string;
  createdAt: Date;
  amount: string;
  title: string;
  description: string;
  currency: string;
  model: ModelType;
  contributionId: string;
  type: PaymentType;
  giftId: string;
  campaignId: string;
  userSendId: string;
  userReceiveId: string;
  userId: string;
  email: string;
  color: string;
  fullName: string;
  gift: {
    id: string;
    title: string;
    amount: string;
  };
  campaign: {
    id: string;
    title: string;
  };
  profileSend: {
    id: string;
    url: string;
    email: string;
    color: string;
    image: string;
    userId: string;
    fullName: string;
    firstName: string;
    lastName: string;
    countryId: string;
  };
  profileReceive: {
    id: string;
    url: string;
    email: string;
    color: string;
    image: string;
    userId: string;
    fullName: string;
    firstName: string;
    lastName: string;
    countryId: string;
  };
};
