import { PaymentType } from "@/utils/pagination-item";

export type ActionPayment = 'PAYMENT' | 'WITHDRAWING';

export const arrayTypePayments = [
  { id: "1", name: "CARD" },
  { id: "2", name: "PHONE" },
];

export type PaymentCardFormModel = {
  fullName?: string;
  cardNumber: string;
  cardExpMonth: number;
  cardExpYear: number;
  cardCvc: string;
  type: PaymentType;
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
  status: string;
  cardNumber: string;
  cardExpMonth: number;
  cardExpYear: number;
  cardCvc: string;
  type: PaymentType;
  description: string;
  userId: string;
  organizationId: string;
};
