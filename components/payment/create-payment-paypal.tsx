import { CreateOnPaymentAPI } from '@/api-site/payment';
import { AlertDangerNotification } from '@/utils';
import { generateLongUUID } from '@/utils/generate-random';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PaymentModel } from '../../api-site/payment';
import { Alert, AlertDescription } from '../ui/alert';

type Props = { data?: any; paymentModel: PaymentModel };
const CreatePaymentPayPal = ({ data, paymentModel }: Props) => {
  // const [{ isPending }] = usePayPalScriptReducer();
  const { push } = useRouter();
  const {
    affiliation,
    userAddress,
    amount,
    eventId,
    productId,
    eventDateId,
    cartOrderId,
    userId,
    organizationSellerId,
    organizationBuyerId,
  } = data;
  const currency = amount?.currency;
  const [hasErrors, setHasErrors] = useState<any>(undefined);

  const { mutateAsync } = CreateOnPaymentAPI();

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
      eventId,
      eventDateId,
      organizationSellerId,
      organizationBuyerId,
      userId,
      reference: newReference,
      affiliation: affiliation,
      amount: {
        country: amount?.country,
        taxes: amount?.taxes,
        ticketId: amount?.ticketId,
        quantity: amount?.quantity,
        payer: {
          amount: amountPalpal,
          payerId: order?.payer_id,
          email_address: order?.email_address,
        },
        commission: Number(Number(amount?.commission ?? 0).toFixed(2)),
        valueTotal: Number(amountPalpal?.value),
        currency: amountPalpal?.currency_code,
        value: Number(amount?.value),
        oneValue: Number(amount?.oneValue),
      },
    };

    try {
      await mutateAsync({
        data: payload,
        paymentModel: paymentModel,
      });
      push(
        `/transactions/success?token=${newReference}&type=paypal&tag=tickets`,
      );
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
          description: `Payment ticket`,
          amount: {
            currency_code: currency,
            value: Number(amount?.valueTotal).toFixed(2),
          },
        },
      ],
    });
  };

  return (
    <>
      <div className="mt-4">
        {hasErrors && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{hasErrors}</AlertDescription>
          </Alert>
        )}
        <PayPalScriptProvider
          options={{
            clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
            components: 'buttons',
            currency: currency,
            intent: 'capture',
          }}
        >
          <div className="text-center">
            {/* {isPending && <div className="spinner" />} */}
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
              forceReRender={[Number(amount?.valueTotal).toFixed(2), currency]}
              fundingSource="paypal"
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={async (data, action) => {
                const details = await action?.order?.capture();
                return handleApprove({ order: details });
              }}
              onCancel={() => {}}
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
