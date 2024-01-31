'use client';

import { GetOneCommissionAPI } from '@/api-site/commission';
import { LayoutCheckoutSite } from '@/components/layout-checkout-site';
import { CreatePaymentPayPal } from '@/components/payment/create-payment-paypal';
import { ListCarouselUpload } from '@/components/shop/list-carousel-upload';
import { ButtonInput } from '@/components/ui-setting';
import { AvatarComponent } from '@/components/ui-setting/ant';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { formatePrice } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CheckoutCommission = () => {
  const [isCardPay, setIsCardPay] = useState<boolean>(false);
  const { userStorage: userVisitor } = useAuth() as any;
  const { query, push } = useRouter();
  const commissionId = String(query?.id);
  const {
    watch,
    control,
    register,
    formState: { errors },
  } = useForm();
  const watchAmount = watch('amount', '');
  const { status, data: item } = GetOneCommissionAPI({
    commissionId,
  });

  const newAmount = watchAmount
    ? JSON.parse(watchAmount)
    : {
        currency: item?.currency?.code,
        value: item?.price,
      };

  if (status === 'pending') {
    <LoadingFile />;
  }

  return (
    <>
      <LayoutCheckoutSite title={`Checkout commissions - ${item?.title ?? ''}`}>
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

                    {item?.description ? (
                      <div
                        className={`text-sm font-normal text-gray-600 dark:text-gray-300`}
                      >
                        <span className={`ql-editor`}>
                          <HtmlParser html={String(item?.description ?? '')} />
                        </span>
                      </div>
                    ) : null}

                    {item?.uploadsImage?.length > 0 ? (
                      <div className="mx-auto mt-4 justify-center text-center">
                        <ListCarouselUpload
                          uploads={item?.uploadsImage}
                          folder="commissions"
                          height={400}
                        />
                      </div>
                    ) : null}
                  </>
                ) : null}
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

                      <div className="ml-auto">
                        <p className="cursor-pointer text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900">
                          <Link
                            className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                            href={`/${item?.profile?.username}/commissions`}
                          >
                            Commission
                          </Link>
                        </p>
                      </div>
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

                  <div className="py-6">
                    <>
                      <>
                        {isCardPay ? (
                          <>
                            {/* <CreatePaymentStripe
                                  paymentModel="STRIPE-SUBSCRIBE"
                                  data={{
                                    membershipId,
                                    amount: newAmount,
                                    userReceiveId: item?.userId,
                                    userSendId: userVisitor?.id,
                                    organizationId: item?.organizationId,
                                  }}
                                /> */}
                          </>
                        ) : (
                          <>
                            <div className="mt-2">
                              <ButtonInput
                                onClick={() => setIsCardPay(true)}
                                type="button"
                                className="w-full"
                                size="lg"
                                variant="info"
                              >
                                Card Pay
                              </ButtonInput>
                            </div>
                          </>
                        )}

                        <CreatePaymentPayPal
                          paymentModel="PAYPAL-SUBSCRIBE"
                          data={{
                            commissionId,
                            amount: {},
                            userReceiveId: item?.userId,
                            userSendId: userVisitor?.id,
                            organizationId: item?.organizationId,
                          }}
                        />
                      </>
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
