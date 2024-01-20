import { ButtonInput } from "../ui-setting/ant/button-input";
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
      <div className="flex-auto justify-center p-2">
        {/* <label className="text-base font-medium text-gray-900"> Buy un pot for {user?.profile?.firstName ?? ""} {user?.profile?.lastName ?? ""}</label> */}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">
            <BiCoffeeTogo
              className={`text- size-14${user?.profile?.color}-500`}
            />
          </p>
          <div className="ml-auto flex items-center justify-end space-x-8 rounded-md border border-gray-200">
            <ButtonInput
              shape="default"
              size="normal"
              type="button"
              color={`${user?.profile?.color}`}
              disabled={increment === 1 ? true : false}
              onClick={() => setIncrement((lk) => lk - 1)}
            >
              <svg
                className="size-5"
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

            <span className="text-base font-semibold text-black dark:text-white">
              {increment}
            </span>

            <ButtonInput
              shape="default"
              size="normal"
              type="button"
              color={`${user?.profile?.color}`}
              loading={false}
              onClick={() => setIncrement((lk) => lk + 1)}
            >
              <svg
                className="size-5"
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
            className={`dark:border-gray-800 dark:bg-[#121212] dark:text-white  dark:placeholder:text-gray-500`}
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
            className={`dark:border-gray-800 dark:bg-[#121212] dark:text-white  dark:placeholder:text-gray-500`}
          />
        </div>

        {newValuePrice > 0 ? (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-2xl font-bold text-black dark:text-white">Donate</p>
            {newAmount?.value ? (
              <>
                <p className="ml-auto text-xl font-bold text-black dark:text-white">
                  {newAmount?.value ?? ""}
                </p>
                <p className="ml-1 text-xl font-bold text-black dark:text-white">
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
                    color="indigo"
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
