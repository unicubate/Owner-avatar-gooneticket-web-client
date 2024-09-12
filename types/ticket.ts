import { EventDateModel } from './event-date';

export type TicketModel = {
  createdAt: Date;
  expiredAt: Date;
  id: string;
  eventDateId: string;
  title: string;
  name: string;
  limit: number;
  quantity: number;
  organizationId: number;
  eventId: string;
  description: string;
  amount: number;
  eventDate: EventDateModel;
  difference: number;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
};
