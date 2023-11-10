import { ModelType, PaginationResponse } from "@/utils/pagination-item";

export type ResponseCartModel = {
  value: Array<CartModel>;
};

export type CartOrderModel = {
  createdAt: Date;
  id: string;
  userId: string;
  organizationId: string;
};

export type OneCartModel = {
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
    currency: {
      code: string;
      name: string;
      symbol: string;
    };
    discount: {
      isValid: boolean;
      percent: string;
      expiredAt: Date;
      enableExpiredAt: Date;
    };
    priceDiscount: number;
  };
};

export type CartModel = {
  summary: {
    totalQuantity: number;
    totalPrice: number;
  };
  cartItems: OneCartModel[];
};

export type CartFormModel = {
  organizationId: string;
  productId: string;
  quantity: number;
};
