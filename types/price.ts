export type PriceModel = {
  createdAt: Date;
  expiredAt: Date;
  id: string;
  title: string;
  name: string;
  productId: string;
  description: string;
  amount: number;
};

export type PriceFormModel = {
  name: string;
  amount: boolean;
};
