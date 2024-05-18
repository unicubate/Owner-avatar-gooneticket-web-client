import { CreateOnPaymentPI } from '@/api-site/payment';
import { AlertDangerNotification } from '@/utils';
import { generateLongUUID } from '@/utils/generate-random';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PaymentModel } from '../../api-site/payment';

type Props = { data?: any; paymentModel: PaymentModel };
const CreatePaymentPayPal = ({ data, paymentModel }: Props) => {
  const { push } = useRouter();
  const {
    affiliation,
    userAddress,
    amount,
    productId,
    cartOrderId,
    organizationSellerId,
    organizationBuyerId,
  } = data;
  const currency = amount?.currency;
  const [hasErrors, setHasErrors] = useState<any>(undefined);

  const { mutateAsync } = CreateOnPaymentPI({
    onSuccess: () => {
      setHasErrors(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const handleApprove = async (options: { order: any }) => {
    const { order } = options;
    const name = order?.payer?.name?.given_name;
    const newReference = generateLongUUID(30);
    const amountPalpal = order?.purchase_units[0]?.amount;
    setHasErrors(false);
    const payload = {
      userAddress,
      cartOrderId,
      productId,
      organizationSellerId,
      organizationBuyerId,
      reference: newReference,
      affiliation: affiliation,
      amount: {
        taxes: amount?.taxes,
        price: amount.price,
        quantity: amount.quantity,
        currency: amountPalpal?.currency_code,
        value: Number(amountPalpal?.value),
        oneValue: Number(amount?.oneValue),
      },
    };

    try {
      await mutateAsync({
        data: payload,
        paymentModel: paymentModel,
      });

      push(`/transactions/success?token=${newReference}`);
    } catch (error: any) {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const createOrder = (data: any, actions: any) => {
    return actions?.order?.create({
      purchase_units: [
        {
          description: 'Payment balance',
          amount: {
            currency_code: currency,
            value: Number(amount?.value),
          },
        },
      ],
    });
  };

  return (
    <>
      <div className="mt-4">
        {hasErrors ? (
          <div className="rounded-lg bg-red-600">
            <div className="p-3">
              <div className="flex items-start justify-between md:items-center">
                <div className="flex-1 md:flex md:items-center md:justify-between">
                  <p className="text-sm font-medium text-white">{hasErrors}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <PayPalScriptProvider
          options={{
            clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
            components: 'buttons',
            currency: currency,
            intent: 'capture',
          }}
        >
          <div className="text-center">
            <PayPalButtons
              onClick={(data, actions) => {
                const hasAllReadyExecuteTransaction: boolean = false;
                return hasAllReadyExecuteTransaction
                  ? actions.reject()
                  : actions?.resolve();
              }}
              disabled={false}
              style={{
                height: 45,
                layout: 'vertical',
                label: 'paypal',
                color: 'gold',
              }}
              forceReRender={[Number(amount?.value), currency]}
              fundingSource="paypal"
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={async (data, action) => {
                const details = await action?.order?.capture();
                return handleApprove({ order: details });
              }}
              onCancel={() => { }}
              onError={(error) => {
                setHasErrors(error);
                console.log(`PayPal Checkout onError ====>`, error);
              }}
            />
          </div>
        </PayPalScriptProvider>
      </div>
    </>
  );
};

export { CreatePaymentPayPal };
