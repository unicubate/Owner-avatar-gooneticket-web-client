'use client';

import { GetCartsAPI, GetOneCartOrderAPI } from '@/api-site/cart';
import { ListMiniCats } from '@/components/cart/list-mini-carts';
import { LayoutCheckoutSite } from '@/components/layout-checkout-site';
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
  const { id: cartOrderId, username } = query;

  const {
    isLoading: isLoadingCardOrder,
    isError: isErrorCardOrder,
    data: cartOrder,
  } = GetOneCartOrderAPI({
    organizationId: userVisitor?.organizationId,
  });

  const {
    isLoading: isLoadingCart,
    isError: isErrorCart,
    data: carts,
  } = GetCartsAPI({
    cartOrderId: String(cartOrderId),
    userId: cartOrder?.userId,
    organizationId: userVisitor?.organizationId,
  });

  const dataTableCarts =
    isLoadingCart || isLoadingCardOrder ? (
      <LoadingFile />
    ) : isErrorCart || isErrorCardOrder ? (
      <ErrorFile
        status="error"
        title="404"
        description="Error find data please try again"
      />
    ) : (
      carts?.cartItems.length > 0 &&
      carts?.cartItems.map((item, index: number) => (
        <ListMiniCats item={item as any} key={index} index={index} />
      ))
    );

  const newAmount = {
    currency: carts?.cartItems[0]?.product?.currency?.code,
    value: carts?.summary?.totalPriceDiscount,
  };

  if (Number(carts?.summary?.totalPriceDiscount) <= 0) {
    push(`${`/${username}/shop`}`);
  }

  return (
    <>
      <LayoutCheckoutSite title={`Checkout shop`}>
        <div className="overflow-hidden bg-white dark:bg-[#121212] shadow rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-5 py-6 dark:bg-[#121212] md:px-8">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-800 -my-7">
                  {dataTableCarts}
                </ul>
              </div>
            </div>

            <div className="px-5 py-6 md:px-8">
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800 ">
                  <div className="py-6">
                    <div className="mb-2 flex items-center">
                      <AvatarComponent
                        size={40}
                        className="size-10 shrink-0 rounded-full"
                        profile={carts?.cartItems[0]?.profileVendor}
                      />

                      <div className="ml-2 cursor-pointer">
                        <p className="text-sm font-bold">
                          {carts?.cartItems[0]?.profileVendor?.firstName ?? ''}{' '}
                          {carts?.cartItems[0]?.profileVendor?.lastName ?? ''}
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
      </LayoutCheckoutSite>
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
