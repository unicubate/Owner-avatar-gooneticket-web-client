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
  country: {
    code: string;
    name: string;
  };
};

export type EventDateFormModel = {
  expiredAt: Date;
  eventId: string;
  timeInit: string;
  timeEnd: string;
};
