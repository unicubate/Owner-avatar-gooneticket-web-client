'use client';

import { GetCartsAPI, GetOneCartOrderAPI } from '@/api-site/cart';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { ListMiniCats } from '@/components/cart/list-mini-carts';
import { CreatePaymentPayPal } from '@/components/payment/create-payment-paypal';
import { CreatePaymentStripe } from '@/components/payment/stripe/create-payment-stripe';
import { ButtonInput } from '@/components/ui-setting';
import { AvatarComponent, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { formatePrice } from '@/utils';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CheckoutShop = () => {
  const [isCardPay, setIsCardPay] = useState<boolean>(false);
  const { userStorage: userVisitor } = useAuth() as any;
  const { query, push } = useRouter();
  const cartOrderId = String(query?.id);
  const username = String(query?.username);

  const { status: statusUser, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisitor?.id,
  });

  const { status, data: cartOrder } = GetOneCartOrderAPI({
    organizationId: user?.organizationId,
  });

  const {
    isLoading: isLoadingCart,
    isError: isErrorCart,
    data: carts,
  } = GetCartsAPI({
    cartOrderId: cartOrderId,
    userId: cartOrder?.userId,
    organizationId: user?.organizationId,
  });

  const dataTableCarts = isLoadingCart ? (
    <LoadingFile />
  ) : isErrorCart ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again"
    />
  ) : (
    carts?.cartItems.map((item, index: number) => (
      <ListMiniCats item={item as any} key={index} index={index} />
    ))
  );

  const newAmount = {
    currency: carts?.cartItems[0]?.product?.currency?.code,
    value: carts?.summary?.totalPrice,
  };

  if (Number(carts?.summary?.totalPrice) <= 0) {
    push(`${`/${username}/shop`}`);
  }
  return (
    <>
      <div className="py-10 bg-gray-50 dark:bg-[#1c1b22] sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {/* <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <span className="px-2 py-1 ml-4 text-xs font-bold tracking-widest uppercase bg-gray-400 rounded-full rounded-r-nonepy-1 text-gray-50">
              {' '}
              3 Items{' '}
            </span>
          </div> */}

          <div className="max-w-6xl mx-auto mt-6 md:mt-12">
            <div className="overflow-hidden bg-white dark:bg-[#121212] shadow rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="px-5 py-6 dark:bg-[#121212] md:px-8">
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-800 -my-7">
                      {dataTableCarts}
                    </ul>
                  </div>

                  {/* <hr className="mt-6 divide-gray-200 dark:divide-gray-800" /> */}

                  {/* <form action="#" className="mt-6">
                    <div className="sm:flex sm:space-x-2.5 md:flex-col lg:flex-row md:space-x-0 lg:space-x-2.5">
                      <div className="flex-grow">
                        <label className="sr-only"> Coupon code </label>
                        <input
                          type="text"
                          id=""
                          name=""
                          placeholder="Enter coupon code"
                          className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                        />
                      </div>
                      <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                        <button
                          type="submit"
                          className="items-center justify-center w-full px-4 py-3 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md inline- focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                        >
                          Apply coupon
                        </button>
                      </div>
                    </div>
                  </form> */}
                </div>

                <div className="px-5 py-6 md:px-8">
                  <div className="flow-root">
                    <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800 ">
                      <div className="py-6">
                        <div className="mb-2 flex items-center">
                          <AvatarComponent
                            size={40}
                            className="size-10 shrink-0 rounded-full"
                            profile={user?.profile}
                          />

                          <div className="ml-2 cursor-pointer">
                            <p className="text-sm font-bold">
                              {user?.profile?.firstName ?? ''}{' '}
                              {user?.profile?.lastName ?? ''}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-500">
                              Checkout
                            </p>
                          </div>

                          <div className="ml-auto">
                            <p className="cursor-pointer text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900">
                              <Link
                                className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                                href={`/${username}/shop`}
                              >
                                Continue Shopping
                              </Link>
                            </p>
                          </div>
                        </div>

                        {/* <div className="space-y-5 mt-4">
                          <>
                            {isCardPay ? (
                              <>
                                <CreatePaymentStripe
                                  paymentModel="STRIPE-SHOP"
                                  data={{
                                    cartOrderId,
                                    amount: newAmount,
                                    userReceiveId: cartOrder?.userId,
                                    userSendId: userVisitor?.id,
                                    organizationId: cartOrder?.organizationId,
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                <div className="mt-2">
                                  <ButtonInput
                                    onClick={() => setIsCardPay(true)}
                                    type="button"
                                    size="lg"
                                    className="w-full"
                                    variant="info"
                                  >
                                    Card Pay
                                  </ButtonInput>
                                </div>
                              </>
                            )}

                            <CreatePaymentPayPal
                              paymentModel="PAYPAL-SHOP"
                              data={{
                                cartOrderId,
                                amount: newAmount,
                                userReceiveId: cartOrder?.userId,
                                userSendId: userVisitor?.id,
                                organizationId: cartOrder?.organizationId,
                              }}
                            />
                          </>
                        </div> */}
                      </div>
                      <div className="py-6">
                        <ul className="space-y-3">
                          {/* <li className="flex items-center justify-between">
                            <p className="text-sm font-medium dark:text-white">
                              Tva
                            </p>
                            {newAmount?.value ? (
                              <>
                                <p className="ml-auto text-sm font-bold dark:text-white">
                                  {formatePrice({
                                    value: Number(newAmount?.value),
                                    isDivide: false,
                                  }) ?? ''}
                                </p>
                                <p className="ml-1 text-sm font-bold dark:text-white">
                                  {newAmount?.currency}
                                </p>
                              </>
                            ) : null}
                          </li> */}
                          <li className="flex items-center justify-between">
                            <p className="text-3xl font-medium dark:text-white">
                              Total
                            </p>
                            {newAmount?.value ? (
                              <>
                                <p className="ml-auto text-lg font-bold dark:text-white">
                                  {newAmount?.currency}
                                </p>
                                <p className="ml-2 text-lg font-bold dark:text-white">
                                  {formatePrice({
                                    value: Number(newAmount?.value),
                                    isDivide: false,
                                  }) ?? ''}
                                </p>
                              </>
                            ) : null}
                          </li>
                        </ul>
                      </div>

                      <div className="py-6">
                        <>
                          {isCardPay ? (
                            <>
                              <CreatePaymentStripe
                                paymentModel="STRIPE-SHOP"
                                data={{
                                  cartOrderId,
                                  amount: newAmount,
                                  userReceiveId: cartOrder?.userId,
                                  userSendId: userVisitor?.id,
                                  organizationId: cartOrder?.organizationId,
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <div className="mt-2">
                                <ButtonInput
                                  onClick={() => setIsCardPay(true)}
                                  type="button"
                                  size="lg"
                                  className="w-full"
                                  variant="info"
                                >
                                  Card Pay
                                </ButtonInput>
                              </div>
                            </>
                          )}

                          <CreatePaymentPayPal
                            paymentModel="PAYPAL-SHOP"
                            data={{
                              cartOrderId,
                              amount: newAmount,
                              userReceiveId: cartOrder?.userId,
                              userSendId: userVisitor?.id,
                              organizationId: cartOrder?.organizationId,
                            }}
                          />
                        </>
                      </div>

                      <div className="py-6">
                        <h2 className="font-bold text-gray-500 text-base">
                          Billing Information
                        </h2>
                      </div>

                      <div className="py-6">
                        <h2 className="font-bold text-gray-500 text-base">
                          Payment Method
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="mt-4 text-sm font-normal text-gray-500">
                All the taxes will be calculated while checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateComponent(CheckoutShop);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
        ...(await import(`/lang/${locale}/common.json`)).default,
      },
    },
  };
}
