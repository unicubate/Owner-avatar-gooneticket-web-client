import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeCheckoutForm } from "./stripe-checkout-form";
import { PaymentModel } from "@/api/payment";

const stripeTestPromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
);

export type StripeProps = {
  data?: any;
  paymentModel: PaymentModel;
  billingDetails: {
    name: string;
    email: string;
    phone?: string;
    address?: {
      city?: string;
      line1?: string;
      state?: string;
      country?: string;
      postal_code?: string;
    };
  };
};

const CreateSubscribeStripe: React.FC<StripeProps> = ({
  data,
  paymentModel,
  billingDetails,
}) => {
  return (
    <>
      <div className="mt-4">
        <Elements stripe={stripeTestPromise}>
          <StripeCheckoutForm
            paymentModel={paymentModel}
            data={data}
            billingDetails={billingDetails}
          />
        </Elements>
      </div>
    </>
  );
};
export { CreateSubscribeStripe };
