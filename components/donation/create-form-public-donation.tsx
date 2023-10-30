import { ButtonInput } from "../ui/button-input";
import { Input } from "antd";
import { useState } from "react";
import { BiCoffeeTogo } from "react-icons/bi";
import { useAuth } from "../util/context-user";
import { CreatePaymentStripe } from "../payment/stripe/create-payment-stripe";
import { CreatePaymentPayPal } from "../payment/create-payment-paypal";
import { UserModel } from "@/types/user.type";
const { TextArea } = Input;

const CreateFormPublicDonation: React.FC<{
  user: UserModel;
}> = ({ user }) => {
  const { userStorage: userVisitor } = useAuth() as any;
  const initialPrice = String(user?.donationUser?.price || 0);
  const initialCurrency = user?.profile?.currency?.code;
  const [increment, setIncrement] = useState(1);
  const [price, setPrice] = useState(initialPrice);
  const [description, setDescription] = useState("");
  const [isCardPay, setIsCardPay] = useState<boolean>(false);

  const newValuePrice: number = Number(price) * increment;
  const newAmount = {
    potTotal: increment,
    value: newValuePrice,
    description: description,
    currency: initialCurrency,
  };
  return (
    <>
      <div className="p-2 flex-auto justify-center">
        {/* <label className="text-base font-medium text-gray-900"> Buy un pot for {user?.profile?.firstName ?? ""} {user?.profile?.lastName ?? ""}</label> */}

        <div className="flex items-center justify-between mt-6">
          <p className="text-xl font-bold text-gray-900">
            <BiCoffeeTogo
              className={`h-14 w-14 text-${user?.profile?.color}-500`}
            />
          </p>
          <div className="ml-auto flex items-center justify-end space-x-8 border border-gray-100 rounded-md">
            <ButtonInput
              shape="default"
              size="normal"
              type="button"
              color={user?.profile?.color}
              loading={false}
              disabled={increment === 1 ? true : false}
              onClick={() => setIncrement((lk) => lk - 1)}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </ButtonInput>

            <span className="text-base font-semibold text-gray-900">
              {increment}
            </span>

            <ButtonInput
              shape="default"
              size="normal"
              type="button"
              color={user?.profile?.color}
              loading={false}
              onClick={() => setIncrement((lk) => lk + 1)}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </ButtonInput>
          </div>
        </div>

        <div className="mt-4">
          <Input
            size="large"
            id="price"
            required={true}
            style={{ width: "100%" }}
            type="number"
            name="price"
            placeholder={`${newValuePrice}`}
            prefix={<strong>{initialCurrency}</strong>}
            min={1}
            value={newValuePrice}
            onChange={(e) => setPrice(e?.target.value)}
          />
        </div>

        <div className="mt-4">
          <TextArea
            rows={4}
            id="description"
            name="description"
            placeholder="Your message (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {newValuePrice > 0 ? (
          <div className="flex items-center justify-between mt-6">
            <p className="text-2xl font-bold text-gray-900">Donate</p>
            {newAmount?.value ? (
              <>
                <p className="ml-auto text-xl font-bold text-gray-900">
                  {newAmount?.value ?? ""}
                </p>
                <p className="ml-1 text-xl font-bold text-gray-900">
                  {initialCurrency}
                </p>
              </>
            ) : null}
          </div>
        ) : null}

        {newValuePrice > 0 ? (
          <>
            {isCardPay ? (
              <>
                <CreatePaymentStripe
                  paymentModel="STRIPE-DONATION"
                  data={{
                    amount: newAmount,
                    userReceiveId: user?.id,
                    userSendId: userVisitor?.id,
                    organizationId: user?.organizationId,
                  }}
                />
              </>
            ) : (
              <>
                <div className="mt-2">
                  <ButtonInput
                    onClick={() => setIsCardPay(true)}
                    shape="default"
                    type="button"
                    size="large"
                    color={user?.profile?.color}
                    loading={false}
                  >
                    Card Pay
                  </ButtonInput>
                </div>
              </>
            )}

            <CreatePaymentPayPal
              paymentModel="PAYPAL-DONATION"
              data={{
                amount: newAmount,
                userReceiveId: user?.id,
                userSendId: userVisitor?.id,
                organizationId: user?.organizationId,
              }}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export { CreateFormPublicDonation };
