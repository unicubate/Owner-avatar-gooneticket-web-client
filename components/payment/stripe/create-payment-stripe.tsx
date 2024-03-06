import { PaymentModel } from '@/api-site/payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripeCheckoutForm } from './stripe-checkout-form';

export const stripeKeyPromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`,
);

export type StripeProps = {
  data?: any;
  paymentModel: PaymentModel;
};

const CreatePaymentStripe: React.FC<StripeProps> = ({ data, paymentModel }) => {
  return (
    <>
      <div className="mt-4">
        <Elements stripe={stripeKeyPromise}>
          <StripeCheckoutForm paymentModel={paymentModel} data={data} />
        </Elements>
      </div>
    </>
  );
};
export { CreatePaymentStripe };
