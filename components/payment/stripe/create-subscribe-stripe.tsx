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
};

const CreateSubscribeStripe: React.FC<StripeProps> = ({
  data,
  paymentModel,
}) => {
  return (
    <>
      <div className="mt-4">
        <Elements stripe={stripeTestPromise}>
          <StripeCheckoutForm
            paymentModel={paymentModel}
            data={data}
          />
        </Elements>
      </div>
    </>
  );
};
export { CreateSubscribeStripe };
