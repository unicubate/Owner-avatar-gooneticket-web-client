'use client';

import { GetOneAffiliationAPI } from '@/api-site/affiliation';
import { GetOneProductAPI } from '@/api-site/product';
import { useInputState, useReactHookForm } from '@/components/hooks';
import { LayoutCheckoutSite } from '@/components/layouts/checkout-site';
import { CreatePaymentFree } from '@/components/payment/create-payment-free';
import { CreatePaymentPayPal } from '@/components/payment/create-payment-paypal';
import { CreateCardStripe } from '@/components/payment/stripe/create-payment-stripe';
import { EventCheckoutSkeleton } from '@/components/skeleton/event-checkout-skeleton';
import { ButtonInput, ListCarouselUpload } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Input } from '@/components/ui/input';
import { PrivateComponent } from '@/components/util/private-component';
import { PriceModel } from '@/types/price';
import { formatePrice, formateToRFC2822 } from '@/utils';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import * as yup from 'yup';

type NewAmountType = {
  quantity: number;
  currency: string;
  value: number;
  price: PriceModel,
  oneValue: number;
  taxes: number
};

const paymentMethodArray = [
  {
    name: 'Bank card',
    value: 'STRIPE',
    image: <FaCreditCard className="size-6" />,
  },
  {
    name: 'PayPal',
    value: 'PAYPAL',
    image: <FaPaypal className="size-6" />,
  }
]

const schema = yup.object({
  fullName: yup.string().required('first name is a required field'),
  email: yup.string().email().required('email is a required field'),
  paymentMethod: yup.string().required('payment method is a required field'),
});

const CheckoutEvent = () => {
  const [increment, setIncrement] = useState(1);
  const { userStorage, locale } = useInputState();
  const { query, back } = useRouter();
  const { id: productId, partner } = query;
  const { isValid, watch, control, errors, register } = useReactHookForm({ schema });
  const watchAmount = watch('amount', null);
  const watchPaymentMethod = watch('paymentMethod', null);
  const watchFullName = watch('fullName', '');
  const watchEmail = watch('email', '');

  const {
    data: item,
    isLoading: isLoadingProduct,
    isError: isErrorProduct
  } = GetOneProductAPI({
    enableVisibility: 'TRUE',
    productSlug: String(productId),
  });

  const { data: affiliation } = GetOneAffiliationAPI({
    code: String(partner),
    productId: item?.id,
  });


  const userAddress = {
    fullName: watchFullName,
    email: watchEmail,
  };

  const priceJsonParse = watchAmount ? JSON.parse(watchAmount) : item?.prices?.[0] as PriceModel
  const calculatePrice = Number(priceJsonParse?.amount) * increment;
  const newAmount: NewAmountType = {
    quantity: increment,
    price: priceJsonParse,
    currency: item?.currency?.code,
    value: calculatePrice,
    oneValue: Number(priceJsonParse?.amount),
    taxes: Number(userStorage?.organization?.taxes),
  }

  const newAffiliation = {
    id: affiliation?.id,
    code: affiliation?.code,
    percent: affiliation?.percent,
    productId: affiliation?.productId
  }

  return (
    <>
      <LayoutCheckoutSite title={`Checkout - ${item?.title ?? 'events'}`}>

        <div className="max-w-8xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

            <div className="mt-2 grid grid-cols-1 gap-y-10 sm:mt-12 sm:grid-cols-1 sm:gap-8 lg:grid-cols-5 lg:items-start lg:gap-x-10 xl:grid-cols-6 xl:gap-x-10">
              {isLoadingProduct ?
                <EventCheckoutSkeleton />
                : <>
                  <div className="border-gray-200 lg:col-span-3 xl:col-span-4">
                    <div className="flow-root">
                      {/* <ButtonInput
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    back();
                  }}
                  icon={<MoveLeftIcon className="size-4" />}
                >
                  Come back
                </ButtonInput> */}

                      <div
                        key={item?.id}
                        className="my-8 overflow-hidden rounded-lg bg-white dark:bg-[#04080b]"
                      >
                        <div className="p-8 sm:px-8 sm:py-7">
                          {item?.uploadsImages?.length > 0 ? (
                            <div className="group relative mx-auto mt-2 justify-center text-center">
                              <ListCarouselUpload
                                uploads={item?.uploadsImages}
                                folder={String(item?.model.toLocaleLowerCase())}
                                height={200}
                                className={`object-cover`}
                              />
                            </div>
                          ) : null}

                          <div className="font-semibold">
                            {item?.title ? (
                              <div className="my-2 text-lg font-bold">{item?.title ?? ''}b</div>
                            ) : null}
                          </div>

                          <div className="relative mt-4 shrink-0 cursor-pointer">
                            <div className="flex items-center">
                              <div className="flex shrink-0 items-center font-bold">
                                {Number(item?.prices?.length) > 0 ? (
                                  <>
                                    <span className="ml-1 text-xl">
                                      {item?.currency?.symbol ?? ''}
                                    </span>
                                    <span className="ml-1 text-xl">
                                      {newAmount?.oneValue} x{' '}
                                      {increment}
                                    </span>
                                  </>
                                ) : (
                                  <span className="ml-1 text-xl">Free</span>
                                )}
                              </div>

                              <div className="ml-auto hidden font-bold lg:table-cell">
                                <span className="text-lg">
                                  {formateToRFC2822(item?.expiredAt as Date, locale)}
                                </span>
                                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-2 text-sm">{item?.timeInit ?? ''}</span>
                                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-1.5 text-sm">{item?.timeEnd ?? ''}</span>
                              </div>
                            </div>
                          </div>

                          <div className="relative mt-4 shrink-0 cursor-pointer">
                            <div className="hidden items-center lg:table-cell">
                              <div className="flex shrink-0 font-bold">
                                <span className="text-lg">{item?.address ?? ''}</span>
                                <span className="ml-2 text-lg text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-2 text-lg">{item?.city ?? ''}</span>
                                <span className="ml-2 text-lg text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-2 text-lg">
                                  {item?.country?.name ?? ''}
                                </span>
                              </div>
                            </div>

                            <div className="text-lg lg:hidden">
                              <div className="flex font-bold">Date</div>
                              <div className="ml-auto">
                                <span className="text-sm">
                                  {formateToRFC2822(item?.expiredAt as Date, locale)}
                                </span>
                                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-2 text-sm">{item?.timeInit ?? ''}</span>
                                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-1.5 text-sm">{item?.timeEnd ?? ''}</span>
                              </div>
                            </div>

                            <div className="mt-4 text-lg lg:hidden">
                              <div className="flex font-bold">Location</div>
                              <div className="ml-auto">
                                <span className="text-sm">{item?.address ?? ''}</span>
                                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-2 text-sm">{item?.city ?? ''}</span>
                                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-1.5 text-sm">{item?.country?.name ?? ''}</span>
                              </div>
                            </div>
                          </div>

                          <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="py-2 sm:mt-0">
                              <p className="text-lg font-bold">Please select the seat category</p>
                            </div>
                            <div className="py-2 sm:mt-0">
                              <div className="flex items-center rounded border border-gray-200 dark:border-gray-800">
                                <ButtonInput
                                  type="button"
                                  variant="primary"
                                  className="w-full"
                                  disabled={increment === 1 ? true : false}
                                  onClick={() => setIncrement((lk) => lk - 1)}
                                  icon={<PlusIcon className="size-5" />}
                                />

                                <Input
                                  type="number"
                                  id="increment"
                                  value={increment}
                                  className="h-8 w-20 border-transparent text-center [-moz-appearance:_textfield]"
                                />
                                <ButtonInput
                                  type="button"
                                  variant="primary"
                                  className="w-full"
                                  loading={false}
                                  onClick={() => setIncrement((lk) => lk + 1)}
                                  icon={<PlusIcon className="size-5" />}
                                  disabled={!watchAmount}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 space-y-4">

                            {item?.prices?.length > 0 && item?.prices.map((price, index) => (
                              <div key={index}>

                                <label
                                  htmlFor={price?.id}
                                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-blue-600 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600 dark:border-gray-600 dark:bg-[#04080b] dark:hover:border-blue-600"
                                >
                                  <p className="text-gray-700 dark:text-gray-200">{price?.name}</p>

                                  <p className="text-gray-900 dark:text-white">
                                    {formatePrice({
                                      currency: `${item?.currency?.code}`,
                                      value: Number(price?.amount ?? 0),
                                      isDivide: false,
                                    })}{" "}

                                  </p>
                                  <input
                                    type="radio"
                                    {...register("amount")}
                                    value={JSON.stringify(price)}
                                    id={price?.id}
                                    className="sr-only"
                                  />
                                </label>

                              </div>
                            ))}
                          </div>

                          <hr className="mt-8 dark:border-gray-800" />
                          <div className="my-4 font-extrabold">Contact</div>
                          <div className="sm:flex sm:items-center sm:justify-between">

                            <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                              <div className="mt-2">
                                <TextInput
                                  label="Email"
                                  control={control}
                                  type="email"
                                  name="email"
                                  placeholder="Email"
                                  errors={errors}
                                />
                                <span className="text-xs font-medium text-gray-400">
                                  {`After booking, your ticket will be sent to this email address.`}
                                </span>
                              </div>
                              <div className="mt-2">
                                <TextInput
                                  label="Full name"
                                  control={control}
                                  type="text"
                                  name="fullName"
                                  placeholder="Full name"
                                  errors={errors}
                                />
                                <span className="text-xs font-medium text-gray-400">
                                  {`We will only use it to save on the ticket.`}
                                </span>
                              </div>

                            </div>
                          </div>




                        </div>
                      </div>


                    </div>
                  </div>

                  <div className="lg:sticky lg:top-6 lg:order-2 lg:col-span-2">
                    <div className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#04080b]">


                      <div className="p-4 sm:p-6 lg:p-8">
                        <h3 className="font-bold dark:text-white">Riepilogo</h3>

                        <li className="mb-4 mt-2 flex items-center justify-between text-sm">
                          <span className='text-sm dark:text-gray-600'>
                            {formateToRFC2822(item?.expiredAt as Date, locale)}
                          </span>
                          <p className="ml-auto dark:text-gray-400">
                            <span className="text-sm">{item?.timeInit ?? ''}</span>
                            <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                              -
                            </span>
                            <span className="ml-1.5 text-sm">{item?.timeEnd ?? ''}</span>
                          </p>
                        </li>

                        <li className="mb-2 flex items-center justify-between text-sm">
                          <p className="dark:text-gray-600">{increment} {item?.title} </p>

                          {newAmount?.value ?
                            <>
                              <p className="ml-1 text-sm dark:text-gray-400">
                                {formatePrice({
                                  currency: `${item?.currency?.code}`,
                                  value: Number(newAmount?.value),
                                  isDivide: false,
                                }) ?? ''}
                              </p>
                            </>
                            : 'Free'}

                        </li>

                        {/* <hr className="my-4 dark:border-gray-800" />

                  <li className="flex items-center justify-between text-sm">
                    <p className="dark:text-gray-600">Commissioni di servizio</p>
                    <p className="ml-auto dark:text-gray-400">
                      € 3,00
                    </p>
                  </li> */}
                        <hr className="my-4 dark:border-gray-800" />

                        <li className="my-2 flex items-center justify-between">
                          <p className="text-3xl font-medium dark:text-white">
                            Total
                          </p>
                          {newAmount?.value ? (
                            <>
                              <p className="ml-1 text-xl font-bold dark:text-white">
                                {formatePrice({
                                  currency: `${item?.currency?.code}`,
                                  value: Number(newAmount?.value),
                                  isDivide: false,
                                }) ?? ''}
                              </p>
                            </>
                          ) : 'Free'}
                        </li>
                      </div>
                    </div>



                    {!item?.isExpired && (
                      <>
                        {newAmount?.value && watchFullName && watchEmail ?
                          <div className="mt-2 overflow-hidden rounded-lg bg-white dark:bg-[#04080b]">
                            <div className="p-4 sm:p-4 lg:p-3">
                              <div className="font-extrabold">Payment method</div>
                              <div className="mt-4 space-y-4">

                                {paymentMethodArray.map((lk, index) => (
                                  <div key={index}>

                                    <label
                                      htmlFor={lk?.value}
                                      className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-blue-600 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600 dark:border-gray-600 dark:bg-[#04080b] dark:hover:border-blue-600"
                                    >
                                      <p className="text-gray-700 dark:text-gray-200">{lk?.name}</p>

                                      <p className="text-gray-700 dark:text-white">
                                        {lk?.image}
                                      </p>
                                      <input
                                        type="radio"
                                        {...register("paymentMethod")}
                                        value={lk?.value}
                                        id={lk?.value}
                                        className="sr-only"
                                      />
                                    </label>

                                  </div>
                                ))}

                              </div>
                            </div>
                          </div>
                          : null}




                        {Number(item?.prices?.length) > 0 ?

                          <>
                            {!isValid && !watchPaymentMethod ?
                              <div className="my-4 items-center">
                                <ButtonInput
                                  size="lg"
                                  type="submit"
                                  variant="primary"
                                  className="w-full"
                                  disabled={!isValid}
                                >
                                  Continue
                                </ButtonInput>
                              </div>
                              :
                              <>

                                {isValid && newAmount?.value ?
                                  <>
                                    {watchPaymentMethod === 'STRIPE' ? (
                                      <div className="mt-2 overflow-hidden rounded-lg bg-white dark:bg-[#04080b]">
                                        <div className="p-4 sm:p-4 lg:p-3">
                                          <CreateCardStripe
                                            paymentModel="STRIPE-EVENT"
                                            data={{
                                              userAddress,
                                              productId: item?.id,
                                              amount: newAmount,
                                              affiliation: newAffiliation,
                                              organizationSellerId:
                                                item?.organizationId,
                                              organizationBuyerId:
                                                userStorage?.organizationId,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    ) : null}

                                    {watchPaymentMethod === 'PAYPAL' ? (
                                      <CreatePaymentPayPal
                                        paymentModel="PAYPAL-EVENT"
                                        data={{
                                          userAddress,
                                          productId: item?.id,
                                          amount: newAmount,
                                          affiliation: newAffiliation,
                                          organizationSellerId:
                                            item?.organizationId,
                                          organizationBuyerId:
                                            userStorage?.organizationId
                                        }}
                                      />
                                    ) : null}

                                  </>
                                  :
                                  <div className="my-4 flex items-center">
                                    <ButtonInput
                                      type="submit"
                                      variant="primary"
                                      className="w-full"
                                    >
                                      Continue
                                    </ButtonInput>
                                  </div>
                                }
                              </>
                            }
                          </>
                          :
                          <>
                            <CreatePaymentFree
                              paymentModel="FREE-EVENT"
                              data={{
                                userAddress,
                                productId: item?.id,
                                affiliation: newAffiliation,
                                amount: {
                                  quantity: 1,
                                  price: 0,
                                  currency: 'USD',
                                  value: 0,
                                  oneValue: Number(priceJsonParse?.amount),
                                },
                                organizationSellerId:
                                  item?.organizationId,
                                organizationBuyerId:
                                  userStorage?.organizationId,
                              }}
                            />

                          </>
                        }
                      </>
                    )}
                  </div>

                </>}



            </div>


          </div>
        </div>
      </LayoutCheckoutSite>
    </>
  );
};
export default PrivateComponent(CheckoutEvent);
