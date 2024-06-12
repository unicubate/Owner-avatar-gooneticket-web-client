import { ProfileItemModel } from './profile';
import { UploadModel } from './upload';

export type ResponseCartModel = {
  value: Array<CartModel>;
};

export type CartOrderModel = {
  createdAt: Date;
  id: string;
  userId: string;
  organizationId: string;
  profileVendor: ProfileItemModel;
};

export type OneCartModel = {
  createdAt: Date;
  id: string;
  quantity: number;
  productId: string;
  userId: string;
  organizationSellerId: string;
  priceTotalProduct: number;
  profileVendor: ProfileItemModel;
  uploadsImages: Array<UploadModel>;
  uploadsFiles: Array<UploadModel>;
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
    totalPriceDiscount: number;
  };
  cartItems: OneCartModel[];
};

export type CartFormModel = {
  organizationId: string;
  productId: string;
  quantity: number;
};
