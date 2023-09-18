import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { CreateOnPaymentPI } from "@/api/payment";
import { ButtonInput } from "@/components/ui/button-input";
import { StripeProps } from "./create-subscribe-stripe";
import { AlertDangerNotification } from "@/utils";
import { useRouter } from "next/router";

const containerStyles = {
  border: "1px solid #d3d3d3",
  padding: "12px 17px 12px 17px",
  borderRadius: "10px",
  width: "100%",
};

const CARD_OPTIONS: any = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#424770",
      // lineHeight: '24px',
      fontWeight: 600,
      fontFamily:
        "Roboto, Source Code Pro, monospace, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};

const StripeCheckoutForm: React.FC<StripeProps> = ({
  data,
  paymentModel,
  billingDetails,
}) => {
  const { push } = useRouter();
  const [checkoutError, setCheckoutError] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const { handleSubmit } = useForm();
  const stripe = useStripe();
  const elements: any = useElements();

  if (!stripe || !elements) {
    return;
  }

  const onSubmit = async (payload: any) => {
    setLoading(true);
    setHasErrors(true);

    try {
      const paymentMethodReq: any = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card"),
        billing_details: billingDetails,
      });
      const { paymentMethod } = paymentMethodReq;

      if (paymentMethodReq?.error) {
        setCheckoutError(paymentMethodReq?.error.message);
        setLoading(false);
        return;
      }

      const { data: response } = await CreateOnPaymentPI({
        data: { ...data, paymentMethod },
        paymentModel,
      });

      setHasErrors(false);
      setLoading(false);
      
      push(`/transactions/success?token=${response?.token}`);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-2">
        <div style={containerStyles}>
          <CardElement options={CARD_OPTIONS} />
        </div>
      </div>
      {checkoutError ? (
        <div className="text-sm my-4 text-red-500">{checkoutError}</div>
      ) : null}
      <div className="mt-2">
        <ButtonInput
          shape="default"
          type="submit"
          size="large"
          loading={loading || !stripe || !elements}
          color={"indigo"}
        >
          Continue
        </ButtonInput>
      </div>
    </form>
  );
};

export { StripeCheckoutForm };
