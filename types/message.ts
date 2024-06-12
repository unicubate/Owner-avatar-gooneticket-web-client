import { ModelType, PaginationResponse } from '@/utils/paginations';
import { ProfileItemModel } from './profile';

export type ResponseConversationModel = {
  value: Array<ConversationModel>;
} & PaginationResponse;

export type ConversationModel = {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  fkConversationId: string;
  readAt: Date;
  type: 'PERSONAL' | 'MULTIPLE';
  blockedAt: Date;
  sendEmail: boolean;
  profile: ProfileItemModel;
  lastMessage: {
    id: string;
    model: ModelType;
    createdAt: Date;
    description: string;
    organizationId: string;
    fkConversationId: string;
  };
};

export type ConversationsMessageModel = {
  createdAt: Date;
  id: string;
  description: string;
  model: 'MESSAGE';
  fkConversationId: string;
  color: string;
  organizationId: string;
  profile: ProfileItemModel;
  totalLike: number;
};

export type MessageFormModel = {
  description: string;
  model: ModelType;
  fkConversationId: string;
};

export type ConversationFormModel = {
  description: string;
  organizationToId: string;
};
