import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CreateOnPaymentAPI } from "@/api/payment";
// import { CreatePaypalBillingMutation, PayPalPayFormRequest } from '../../core/_moduls';
// import { useNavigate } from 'react-router-dom';

type Props = { data?: any };
const CreateBillingPayPal: React.FC<Props> = ({ data }) => {
  const { currency, amount, membershipId, userId } = data;
  const [hasErrors, setHasErrors] = useState<any>(undefined);

  const { mutateAsync: saveMutation } = CreateOnPaymentAPI({
    onSuccess: (result?: any) => {
      setHasErrors(false);
      // if (result?.token) { navigate(`/account/billing/success?token=${result?.token}`, { replace: true }) }
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const handleApprove = (order: any) => {
    const amountPalpal = order?.purchase_units[0]?.amount;
    setHasErrors(undefined);
    const data = {
      amount: { value: Number(amountPalpal?.value), month: amount?.month },
      currency: amountPalpal?.currency_code,
    };
    saveMutation({
      ...data,
      membershipId,
      userId,
      paymentMethod: "PAYPAL-SUBSCRIBE",
    });
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

  console.log("data =====>", data);
  return (
    <>
      <div className="mt-4">
        {/* {hasErrors && (
          <div className="text-center alert alert-danger">
            <div className="d-flex flex-column">
              <h4 className="mb-1 text-danger">Error</h4>
              <span>{hasErrors}</span>
            </div>
          </div>
        )} */}
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
export { CreateBillingPayPal };
