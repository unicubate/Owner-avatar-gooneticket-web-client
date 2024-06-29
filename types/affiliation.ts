import { PaginationResponse } from '@/utils/paginations';
import { EventDateModel } from './event-date';
import { ProfileItemModel } from './profile';
import { TicketModel } from './ticket';
import { UploadModel } from './upload';

export type ResponseAffiliationModel = {
  value: Array<AffiliationModel>;
} & PaginationResponse;

export type AffiliationModel = {
  createdAt: Date;
  id: string;
  code: string;
  url: string;
  percent: number;
  description: string;
  expiredAt: string;
  productId: string;
  product: {
    currency: string;
    title: string;
    slug: string;
  };
  event: {
    currency: string;
    title: string;
    slug: string;
    model: string;
  };
  orderItem: {
    amount: number;
    quantity: number;
  };
  oneUploadImagesEvent: UploadModel;
  oneEventDate: EventDateModel;
  oneTicket: TicketModel;
  profile: ProfileItemModel;
  organizationSellerId: string;
};
