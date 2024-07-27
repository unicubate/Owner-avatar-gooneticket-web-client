export type TicketModel = {
  createdAt: Date;
  expiredAt: Date;
  id: string;
  title: string;
  name: string;
  productId: string;
  description: string;
  amount: number;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
};
