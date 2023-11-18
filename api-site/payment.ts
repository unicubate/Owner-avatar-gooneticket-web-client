import { ResponsePostModel } from "@/types/post";
import { makeApiCall } from "@/utils/end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import { useInfiniteQuery } from "@tanstack/react-query";

export type PaymentModel =
  | "PAYPAL-DONATION"
  | "STRIPE-DONATION"
  | "PAYMENT-CREATE"
  | "PAYPAL-SUBSCRIBE"
  | "STRIPE-SUBSCRIBE"
  | "PAYPAL-SHOP"
  | "STRIPE-SHOP";

export const CreateOnPaymentPI = async (payload: {
  data: any;
  paymentModel: PaymentModel;
}): Promise<any> => {
  const { paymentModel, data } = payload;

  if (paymentModel === "PAYPAL-SUBSCRIBE") {
    return await makeApiCall({
      action: "createOnePaymentsPaypalSubscribe",
      body: { paymentModel, ...data },
    });
  }

  if (paymentModel === "STRIPE-SUBSCRIBE") {
    return await makeApiCall({
      action: "createOnePaymentsStripeSubscribe",
      body: { paymentModel, ...data },
    });
  }

  if (paymentModel === "PAYPAL-DONATION") {
    return await makeApiCall({
      action: "createOnePaymentsPaypalDonation",
      body: { paymentModel, ...data },
    });
  }

  if (paymentModel === "STRIPE-DONATION") {
    return await makeApiCall({
      action: "createOnePaymentsStripeDonation",
      body: { paymentModel, ...data },
    });
  }

  if (paymentModel === "PAYPAL-SHOP") {
    return await makeApiCall({
      action: "createOnePaymentsPaypalShop",
      body: { paymentModel, ...data },
    });
  }

  if (paymentModel === "PAYMENT-CREATE") {
    return await makeApiCall({
      action: "createOnePaymentsCreate",
      body: { paymentModel, ...data },
    });
  }
};

export const getPaymentsAPI = async (
  payload: PaginationRequest
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: "getPayments",
    queryParams: payload,
  });
};

export const GetInfinitePaymentsAPI = (payload: {
  take: number;
  sort: SortModel;
}) => {
  const { take, sort } = payload;
  return useInfiniteQuery({
    queryKey: ["payments", "infinite"],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getPaymentsAPI({
        take: take,
        page: Number(pageParam),
        sort: sort,
      }),
    initialPageParam: 1,
  });
};
