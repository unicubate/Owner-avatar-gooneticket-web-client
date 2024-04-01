import { PaymentModel } from '@/api-site/payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CreateStripeCardForm } from './create-stripe-card-form';
import { StripeCheckoutForm } from './stripe-checkout-form';

export const stripeKeyPromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`,
);

export type StripeProps = {
  data?: any;
  paymentModel: PaymentModel;
};

export const CreatePaymentStripe = (props: StripeProps) => {
  const options = {
    theme: 'stripe',
  };
  const { data, paymentModel } = props;

  return (
    <>
      <div className="mt-4">
        {stripeKeyPromise && (
          <Elements stripe={stripeKeyPromise}>
            <StripeCheckoutForm paymentModel={paymentModel} data={data} />
          </Elements>
        )}
      </div>
    </>
  );
};

export const CreateCardStripe = (props: StripeProps) => {
  const { data, paymentModel } = props;
  return (
    <>
      <div className="mt-4">
        <Elements stripe={stripeKeyPromise}>
          <CreateStripeCardForm paymentModel={paymentModel} data={data} />
        </Elements>
      </div>
    </>
  );
};
