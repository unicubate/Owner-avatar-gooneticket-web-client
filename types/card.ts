import { ModelType, PaginationResponse } from "@/utils/pagination-item";

export type ResponseCardModel = {
  value: Array<CardModel>;
};

export type CardOrderModel = {
  createdAt: Date;
  id: string;
  userId: string;
  organizationId: string;
};

export type CardModel = {
  summary: {
    totalQuantity: number;
    totalPrice: number;
  };
  cartItems: [
    {
      createdAt: Date;
      id: string;
      quantity: number;
      productId: string;
      userId: string;
      organizationId: string;
      priceTotalProduct: number;
      product: {
        id: string;
        slug: string;
        price: number;
        title: string;
        discount: {
          isValid: boolean;
          percent: string;
          expiredAt: Date;
          enableExpiredAt: Date;
        };
        priceDiscount: number;
      };
    }
  ];
};

export type CartFormModel = {
  organizationId: string;
  productId: string;
  quantity: number;
};
