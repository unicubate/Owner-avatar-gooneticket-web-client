import { TicketModel } from './ticket';
import { UploadModel } from './upload';

export type EventDateModel = {
  createdAt: Date;
  expiredAt: Date;
  id: string;
  isExpired: boolean;
  eventId: string;
  timeInit: string;
  timeEnd: string;
  city: string;
  address: string;
  oneTicket: TicketModel;
  event: {
    title: string;
    slug: string;
    id: string;
    currency: {
      code: string;
      name: string;
      symbol: string;
    };
  };
  oneUploadsImage: UploadModel;
  country: string;
};

export type EventDateFormModel = {
  expiredAt: Date;
  eventId: string;
  timeInit: string;
  timeEnd: string;
};
