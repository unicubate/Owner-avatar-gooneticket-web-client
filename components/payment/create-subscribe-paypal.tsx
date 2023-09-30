import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CreateOnPaymentPI } from "@/api-site/payment";
import { PaymentModel } from "../../api-site/payment";
import { AlertDangerNotification } from "@/utils";
import { useRouter } from "next/router";

type Props = { data?: any; paymentModel: PaymentModel };
const CreateSubscribePayPal: React.FC<Props> = ({ data, paymentModel }) => {
  const { push } = useRouter();
  const { currency, amount, membershipId, userId } = data;
  const [hasErrors, setHasErrors] = useState<any>(undefined);

  const handleApprove = async (order: any) => {
    const amountPalpal = order?.purchase_units[0]?.amount;
    setHasErrors(undefined);
    const data = {
      amount: { value: Number(amountPalpal?.value), month: amount?.month },
      currency: amountPalpal?.currency_code,
    };

    try {
      const { data: response } = await CreateOnPaymentPI({
        data: { ...data },
        paymentModel,
      });
      
      push(`/transactions/success?token=${response?.token}`);
    } catch (error: any) {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  const createOrder = (data: any, actions: any) => {
    return actions?.order?.create({
      purchase_units: [
        {
          description: "Payment amount balance",
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
        {hasErrors && (
          <div className="text-center alert alert-danger">
            <div className="d-flex flex-column">
              <h4 className="mb-1 text-danger">Error</h4>
              <span>{hasErrors}</span>
            </div>
          </div>
        )}
        <PayPalScriptProvider
          options={{
            clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
            components: "buttons",
            currency: currency,
            intent: "capture",
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
              style={{ layout: "horizontal", label: "paypal", color: "white" }}
              forceReRender={[Number(amount?.value), currency]}
              fundingSource={undefined}
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={async (data, action) => {
                const details = await action?.order?.capture();
                const name = details?.payer?.name?.given_name;
                return handleApprove(details);
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
export { CreateSubscribePayPal };
