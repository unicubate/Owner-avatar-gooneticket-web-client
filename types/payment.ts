import { PaymentType } from '@/utils/paginations';
import { KeyAsString } from '@/utils/utils';

export type ActionPayment = 'PAYMENT' | 'WITHDRAWING';

export const statusPaymentLists: KeyAsString = {
  PENDING: 'CURRENTLY BEING VALIDATED',
  ACTIVE: 'VALID',
  INVALID: 'INVALID',
};

export const statusPaymentColorLists: KeyAsString = {
  PENDING: 'warning',
  ACTIVE: 'success',
  INVALID: 'danger',
};

export const arrayTypePayments = [
  { id: '1', name: 'CARD' },
  { id: '2', name: 'PHONE' },
];

export type PaymentCardFormModel = {
  card: {
    cardNumber: string;
    cardExpMonth: number;
    cardExpYear: number;
    cardCvc: string;
    fullName?: string;
    email?: string;
    isSaveCard?: boolean;
  };
  type: PaymentType;
  reference: string;
};

export type PaymentItemModel = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  id: string;
  email: string;
  action: ActionPayment;
  fullName: string;
  phone: string;
  iban: string;
  status: 'PENDING' | 'ACTIVE' | 'INVALID';
  cardNumber: string;
  cardExpMonth: number;
  cardExpYear: number;
  cardCvc: string;
  type: PaymentType;
  description: string;
  userId: string;
  organizationId: string;
};
