import { makeApiCall } from "@/utils/get-url-end-point";

export type PaymentModel =
  | "PAYPAL-DONATION"
  | "STRIPE-DONATION"
  | "PAYPAL-SUBSCRIBE"
  | "STRIPE-SUBSCRIBE";

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
};
