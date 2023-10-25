import { CloseOutlined } from "@ant-design/icons";
import { ButtonInput } from "../ui/button-input";
import { Input } from "antd";
import { useState } from "react";
import { BiCoffeeTogo } from "react-icons/bi";
import { useAuth } from "../util/context-user";
import { CreatePaymentStripe } from "../payment/stripe/create-payment-stripe";
import { CreatePaymentPayPal } from "../payment/create-payment-paypal";
import { AvatarCoffeeComponent } from "../ui";
const { TextArea } = Input;

const CreatePublicDonation: React.FC<{
  user?: any;
  openModal: boolean;
  setOpenModal: any;
}> = ({ openModal, setOpenModal, user }) => {
  const { userStorage: userVisitor } = useAuth() as any;
  const initialPrice = "3";
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

  console.log("newAmount =======>", newAmount);
  console.log("user =======>", user);
  return (
    <>
      {openModal ? (
        <div className="z-40 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto">
          <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white">
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setOpenModal(false)}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                  <CloseOutlined />
                </span>
              </button>

              <div className="p-2 flex-auto justify-center">
                {/* <div className="font-regular relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                  Error message save to de db je me demande ou je suis merde
                </div> */}

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
                    name="message"
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
                            userId: userVisitor?.id,
                            organizationId: user?.organizationId,
                            amount: newAmount,
                            description: description,
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
                        userId: userVisitor?.id,
                        organizationId: user?.organizationId,
                        amount: newAmount,
                        description: description,
                      }}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { CreatePublicDonation };
