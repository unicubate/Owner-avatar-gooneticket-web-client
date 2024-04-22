'use client';

import { GetCartsAPI } from '@/api-site/cart';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { GetOneUserAddressMeAPI } from '@/api-site/user-address';
import { ListMiniCats } from '@/components/cart/list-mini-carts';
import { useInputState } from '@/components/hooks';
import { LayoutCheckoutSite } from '@/components/layout-checkout-site';
import { CreatePaymentPayPal } from '@/components/payment/create-payment-paypal';
import { CreateCardStripe } from '@/components/payment/stripe/create-payment-stripe';
import { ProfileCheckoutSkeleton } from '@/components/skeleton/profile-checkout-skeleton';
import { ButtonInput } from '@/components/ui-setting';
import { AvatarComponent, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { CreateOrUpdateUserAddressForm } from '@/components/user-address/create-or-update-user-address-form';
import { PrivateComponent } from '@/components/util/private-component';
import { formatePrice } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CheckoutShop = () => {
  const [isPayPalPay, setIsPayPalPay] = useState<boolean>(false);
  const [isCardPay, setIsCardPay] = useState<boolean>(true);
  const { userStorage: userBayer } = useInputState();
  const { query, push } = useRouter();
  const { id: cartOrderId, username, affiliate } = query;

  const { data: userAddress } = GetOneUserAddressMeAPI();
  const {
    isPending: isPendingUser,
    isError: isErrorUser,
    data: userSeller,
  } = GetOneUserPublicAPI({
    username: String(username),
    userVisitorId: userBayer?.id,
  });

  const {
    isLoading: isLoadingCart,
    isError: isErrorCart,
    data: carts,
  } = GetCartsAPI({
    cartOrderId: String(cartOrderId),
    userId: userBayer?.id,
  });

  const dataTableCarts =
    isLoadingCart || isPendingUser ? (
      <LoadingFile />
    ) : isErrorCart || isErrorUser || isErrorUser ? (
      <ErrorFile title="404" description="Error find data please try again" />
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

  useEffect(() => {
    if (Number(carts?.summary?.totalPriceDiscount) <= 0) {
      push(`${`/${username}/shop`}`);
    }
  }, [carts, username, push]);

  return (
    <>
      <LayoutCheckoutSite title={`Checkout shop`}>
        <div className="overflow-hidden rounded-xl bg-white shadow dark:bg-[#121212]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-5 py-6 dark:bg-[#121212] md:px-8">
              <div className="flow-root">
                <ul className="-my-7 divide-y divide-gray-200 dark:divide-gray-800">
                  {dataTableCarts}
                </ul>
              </div>
            </div>

            <div className="px-5 py-6 md:px-8">
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800 ">
                  {carts?.summary?.totalPriceDiscount ? (
                    <>
                      <div className="py-6">
                        <div className="mb-2 flex items-center">
                          <AvatarComponent
                            size={40}
                            className="size-10 shrink-0 rounded-full border"
                            profile={carts?.cartItems[0]?.profileVendor}
                          />

                          <div className="ml-2 cursor-pointer">
                            <p className="text-sm font-bold">
                              {carts?.cartItems[0]?.profileVendor?.firstName ??
                                ''}{' '}
                              {carts?.cartItems[0]?.profileVendor?.lastName ??
                                ''}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-500">
                              Checkout
                            </p>
                          </div>

                          {/* <div className="ml-auto">
                            <p className="cursor-pointer text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900">
                              <Link
                                className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                                href={`/${username}/shop`}
                              >
                                Continue Shopping
                              </Link>
                            </p>
                          </div> */}
                          <ButtonInput
                            type="button"
                            size="sm"
                            variant="info"
                            className="ml-auto"
                          >
                            <Link href={`/${username}/shop`}>
                              Continue Shopping
                            </Link>
                          </ButtonInput>
                        </div>
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
                            <p className="text-lg font-medium dark:text-white">
                              SubTotal
                            </p>
                            {newAmount?.value ? (
                              <>
                                <p className="ml-auto text-sm font-bold dark:text-white">
                                  {newAmount?.currency}
                                </p>
                                <p className="ml-2 text-sm font-bold dark:text-white">
                                  {formatePrice({
                                    value: Number(newAmount?.value),
                                    isDivide: false,
                                  }) ?? ''}
                                </p>
                              </>
                            ) : null}
                          </li>
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

                      <CreateOrUpdateUserAddressForm
                        userAddress={userAddress}
                      />

                      {userAddress?.isUpdated &&
                      userAddress?.street1 &&
                      userAddress?.city &&
                      userAddress?.country ? (
                        <>
                          <div className="py-4">
                            <h2 className="text-base font-bold text-gray-500">
                              Payment Method
                            </h2>
                          </div>
                          <div className="py-6">
                            <div className="flex items-center space-x-4">
                              <ButtonInput
                                size="lg"
                                type="button"
                                variant={isCardPay ? 'info' : 'ghost'}
                                className="w-full"
                                onClick={() => {
                                  setIsPayPalPay(false);
                                  setIsCardPay(true);
                                }}
                              >
                                Card
                              </ButtonInput>
                              <ButtonInput
                                size="lg"
                                type="button"
                                variant={isPayPalPay ? 'info' : 'ghost'}
                                className="w-full"
                                onClick={() => {
                                  setIsCardPay(false);
                                  setIsPayPalPay(true);
                                }}
                              >
                                PayPal
                              </ButtonInput>
                            </div>
                            <>
                              {isCardPay ? (
                                <>
                                  <CreateCardStripe
                                    paymentModel="STRIPE-SHOP"
                                    data={{
                                      affiliate,
                                      userAddress,
                                      cartOrderId,
                                      amount: newAmount,
                                      userBuyerId: userBayer?.id,
                                      organizationSellerId:
                                        userSeller?.organizationId,
                                      organizationBuyerId:
                                        userBayer?.organizationId,
                                    }}
                                  />
                                </>
                              ) : null}

                              {isPayPalPay ? (
                                <CreatePaymentPayPal
                                  paymentModel="PAYPAL-SHOP"
                                  data={{
                                    affiliate,
                                    userAddress,
                                    cartOrderId,
                                    amount: newAmount,
                                    userBuyerId: userBayer?.id,
                                    organizationSellerId:
                                      userSeller?.organizationId,
                                    organizationBuyerId:
                                      userBayer?.organizationId,
                                  }}
                                />
                              ) : null}

                              <Image
                                className="ml-auto mt-2"
                                src={'/assets/payment-cards.png'}
                                height={180}
                                width={180}
                                alt="Payment cards"
                              />
                            </>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : (
                    <ProfileCheckoutSkeleton />
                  )}
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
