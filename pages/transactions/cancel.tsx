'use client';

import { StripeV2CheckoutForm } from '@/components/payment/stripe/stripe-v2-checkout-form';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

const stripeKeyPromise = loadStripe(
  'pk_test_51HlNAbGer4WWA6dnxHNyLU6ITLzgq6KxKONj9OgWbbP5AtdoMsgkpQPp1MFVGbG1TME1ck2sdYqohU7ObWxp4Ii200Khi1WDhw',
);

const TransactionCancel = () => {
  const { query } = useRouter();
  const username = String(query?.username);

  const options = {
    type: 'card',
    mode: 'payment',
    amount: 10,
    currency: 'eur',
  };

  return (
    <>
      <div className="mx-auto max-w-5xl py-6">
        <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
          <div className="flow-root">
            {stripeKeyPromise && (
              <div>
                <Elements stripe={stripeKeyPromise} options={options as any}>
                  <StripeV2CheckoutForm />
                </Elements>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionCancel;
