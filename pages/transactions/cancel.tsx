'use client';

import { GetOnePaymentsStripeClientSecretAPI } from '@/api-site/payment';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

const stripeKeyPromise = loadStripe(
  'pk_test_51HlNAbGer4WWA6dnxHNyLU6ITLzgq6KxKONj9OgWbbP5AtdoMsgkpQPp1MFVGbG1TME1ck2sdYqohU7ObWxp4Ii200Khi1WDhw',
);

const TransactionCancel = () => {
  const { query } = useRouter();
  const username = String(query?.username);

  const {
    data: item,
    isError: isErrorPost,
    isLoading: isLoadingPost,
    refetch,
  } = GetOnePaymentsStripeClientSecretAPI({
    amount: 10,
    currency: 'EUR',
    reference: '535768',
  });

  return (
    <>
      <div className="mx-auto max-w-5xl py-6">
        <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
          {/* {item?.client_secret && (
            <div className="flow-root">
              <StripeV2CheckoutForm clientSecret={item?.client_secret} />
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default TransactionCancel;
