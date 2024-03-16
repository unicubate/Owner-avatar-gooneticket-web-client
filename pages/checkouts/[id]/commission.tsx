'use client';

import { GetOneCommissionAPI } from '@/api-site/commission';
import { GetOneUserAddressMeAPI } from '@/api-site/user-address';
import { useInputState } from '@/components/hooks';
import { LayoutCheckoutSite } from '@/components/layout-checkout-site';
import { CreatePaymentPayPal } from '@/components/payment/create-payment-paypal';
import { CreateCardStripe } from '@/components/payment/stripe/create-payment-stripe';
import { ListCarouselUpload } from '@/components/shop/list-carousel-upload';
import { CommissionCheckoutSkeleton } from '@/components/skeleton/commission-checkout-skeleton';
import { ProfileCheckoutSkeleton } from '@/components/skeleton/profile-checkout-skeleton';
import { ButtonInput } from '@/components/ui-setting';
import { AvatarComponent } from '@/components/ui-setting/ant';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { CreateOrUpdateUserAddressForm } from '@/components/user-address/create-or-update-user-address-form';
import { PrivateComponent } from '@/components/util/private-component';
import { formatePrice } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CheckoutCommission = () => {
  const [isPayPalPay, setIsPayPalPay] = useState<boolean>(false);
  const [isCardPay, setIsCardPay] = useState<boolean>(true);
  const { userStorage: userBayer } = useInputState();
  const { query, push } = useRouter();
  const { id: commissionId, username } = query;
  const {
    watch,
    formState: { errors },
  } = useForm();
  const watchAmount = watch('amount', '');
  const { status, data: item } = GetOneCommissionAPI({
    commissionId: String(commissionId),
  });

  const { data: userAddress } = GetOneUserAddressMeAPI();

  const newAmount = watchAmount
    ? JSON.parse(watchAmount)
    : {
        currency: item?.currency?.code,
        value: item?.priceDiscount,
      };

  if (status === 'pending') {
    <LoadingFile />;
  }

  return (
    <>
      <LayoutCheckoutSite title={`Checkout - ${item?.title ?? 'commissions'}`}>
        <div className="overflow-hidden bg-white dark:bg-[#121212] shadow rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-5 py-6 dark:bg-[#121212] md:px-8">
              <div className="flow-root">
                {item?.id ? (
                  <>
                    <div className="flex items-center">
                      {item?.id ? (
                        <p className="cursor-pointer text-lg font-bold">
                          {item?.title ?? ''}
                        </p>
                      ) : null}
                    </div>

                    {item?.uploadsImages?.length > 0 ? (
                      <div className="mx-auto mt-4 justify-center text-center">
                        <ListCarouselUpload
                          uploads={item?.uploadsImages}
                          folder="commissions"
                          height={400}
                        />
                      </div>
                    ) : null}

                    {item?.description ? (
                      <div
                        className={`text-sm font-normal text-gray-600 dark:text-gray-300`}
                      >
                        <span className={`ql-editor`}>
                          <HtmlParser html={String(item?.description ?? '')} />
                        </span>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <CommissionCheckoutSkeleton />
                )}
              </div>
            </div>

            <div className="px-5 py-6 md:px-8">
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800 ">
                  {item?.id ? (
                    <>
                      <div className="py-6">
                        <div className="mb-2 flex items-center">
                          <AvatarComponent
                            size={40}
                            className="size-10 shrink-0 rounded-full"
                            profile={item?.profile}
                          />

                          <div className="ml-2 cursor-pointer">
                            <p className="text-sm font-bold">
                              {item?.profile?.firstName ?? ''}{' '}
                              {item?.profile?.lastName ?? ''}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-500">
                              Checkout
                            </p>
                          </div>

                          {/* <div className="ml-auto">
                            <p className="cursor-pointer text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900">
                              <Link
                                className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                                href={`/${username}/commissions`}
                              >
                                Commission
                              </Link>
                            </p>
                          </div> */}
                          <ButtonInput
                            type="button"
                            size="sm"
                            variant="info"
                            className="ml-auto"
                          >
                            <Link href={`/${username}/commissions`}>
                              Commission
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
                            <p className="text-3xl font-medium dark:text-white">
                              Total
                            </p>
                            {newAmount?.value ? (
                              <>
                                <p className="ml-auto text-xl font-bold dark:text-white">
                                  {newAmount?.currency}
                                </p>
                                <p className="ml-1 text-xl font-bold dark:text-white">
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

                      {userBayer?.organizationId !== item?.organizationId ? (
                        <>
                          <CreateOrUpdateUserAddressForm
                            userAddress={userAddress}
                          />

                          {userAddress?.isUpdated &&
                          userAddress?.street1 &&
                          userAddress?.city &&
                          userAddress?.country ? (
                            <>
                              <div className="py-4">
                                <h2 className="font-bold text-gray-500 text-base">
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
                                        paymentModel="STRIPE-COMMISSION"
                                        data={{
                                          userAddress,
                                          commissionId,
                                          amount: newAmount,
                                          userReceiveId: item?.userId,
                                          userBuyerId: userBayer?.id,
                                          organizationSellerId:
                                            item?.organizationId,
                                          organizationBuyerId:
                                            userBayer?.organizationId,
                                        }}
                                      />
                                    </>
                                  ) : null}

                                  {isPayPalPay ? (
                                    <CreatePaymentPayPal
                                      paymentModel="PAYPAL-COMMISSION"
                                      data={{
                                        userAddress,
                                        commissionId,
                                        amount: newAmount,
                                        userReceiveId: item?.userId,
                                        userBuyerId: userBayer?.id,
                                        organizationSellerId:
                                          item?.organizationId,
                                        organizationBuyerId:
                                          userBayer?.organizationId,
                                      }}
                                    />
                                  ) : null}
                                </>
                              </div>
                            </>
                          ) : null}
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
export default PrivateComponent(CheckoutCommission);

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
      },
    },
  };
}
