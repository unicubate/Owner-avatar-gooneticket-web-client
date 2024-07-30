import { ModelType, PaginationResponse } from '@/utils/paginations';
import { EventDateModel } from './event-date';
import { ProfileItemModel } from './profile';
import { TicketModel } from './ticket';
import { UploadModel } from './upload';

export type ResponseEventModel = {
  value: Array<EventModel>;
} & PaginationResponse;

export type EventModel = {
  createdAt: Date;
  id: string;
  slug: string;
  title: string;
  model: ModelType;
  description: string;
  categoryId: string;
  urlMedia: string;
  enableLimitSlot: boolean;
  countryId: string;
  organizationId: string;
  enableVisibility: boolean;
  messageAfterPayment: string;
  enableChooseQuantity: boolean;
  totalComment: number;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  profile: ProfileItemModel;
  uploadsImages: Array<UploadModel>;
  uploadsFiles: Array<UploadModel>;
  orderItem: {
    amount: number;
    quantity: number;
  };
  affiliation: {
    amount: number;
    quantity: number;
  };
  oneEventDate: EventDateModel;
  oneTicket: TicketModel;
};

export type EventFormModel = {
  title: string;
  model: ModelType;
  description: string;
  currencyId: string;
  categoryId: string;
  urlMedia: string;
  enableLimitSlot: boolean;
  enableComment: boolean;
  expiredAt: Date;
  city: string;
  timeInit: string;
  timeEnd: string;
  address: string;
  countryId: string;
  enableVisibility: boolean;
  messageAfterPayment: string;
  enableChooseQuantity: boolean;
  attachments: any;
  attachment: any;
  fileList: any;
  newFileLists: any;
  imageList: any;
  newImageLists: any;
};
