'use client';

import { PaymentModel } from '@/api-site/payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CreateStripeCardForm } from './create-stripe-card-form';

export const stripeKeyPromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`,
);

export type StripeProps = {
  data?: any;
  paymentModel: PaymentModel;
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
