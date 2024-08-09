'use client';

import { GetOneAffiliationAPI } from '@/api-site/affiliation';
import { GetOneEventAPI } from '@/api-site/event';
import { GetOneEventDateAPI } from '@/api-site/event-date';
import { GetInfiniteTicketsAPI } from '@/api-site/ticket';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { GetOneUserAddressMeAPI } from '@/api-site/user-address';
import { MediumFooter } from '@/components/footer/medium-footer';
import { useInputState, useRedirectAfterSomeSeconds } from '@/components/hooks';
import { LayoutCheckoutSite } from '@/components/layouts/checkout-site';
import { CreatePaymentBooking } from '@/components/payment/create-payment-booking';
import { CreatePaymentFree } from '@/components/payment/create-payment-free';
import { CreatePaymentPayPal } from '@/components/payment/create-payment-paypal';
import { CreateCardStripe } from '@/components/payment/stripe/create-payment-stripe';
import { EventCheckoutSkeleton } from '@/components/skeleton/event-checkout-skeleton';
import {
  ButtonInput,
  ButtonLoadMore,
  ListCarouselUpload,
} from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Input } from '@/components/ui/input';
import { CreateOrUpdateUserAddressForm } from '@/components/user-address/create-or-update-user-address-form';
import { PrivateComponent } from '@/components/util/private-component';
import { TicketModel } from '@/types/ticket';
import { formateDate, formatePrice, formateToRFC2822 } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { capitalizeFirstLetter } from '@/utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import * as yup from 'yup';

type NewAmountType = {
  country: string;
  quantity: number;
  currency: string;
  value: number;
  ticket: TicketModel;
  oneValue: number;
  taxes: number;
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
  },
];

const schema = yup.object({
  paymentMethod: yup.string().required('payment method is a required field'),
});

const CheckoutEvent = () => {
  const [increment, setIncrement] = useState(1);
  const { ipLocation, userStorage, locale } = useInputState();
  const { query } = useRouter();
  const { id: eventDateId, partner } = query;

  const {
    watch,
    register,
    formState: { isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const watchAmount = watch('amount', null);
  const watchPaymentMethod = watch('paymentMethod', null);

  const { data: userAddress } = GetOneUserAddressMeAPI();
  const [isEdit, setIsEdit] = useState(userAddress?.isUpdated);

  const {
    data: eventDate,
    isError: isErrorEventDate,
    isLoading: isLoadingEventDate,
  } = GetOneEventDateAPI({
    id: String(eventDateId),
  });

  const {
    data: item,
    isLoading: isLoadingEvent,
    isError: isErrorEvent,
  } = GetOneEventAPI({
    enableVisibility: 'TRUE',
    slugOrId: eventDate?.eventId,
  });

  const { data: affiliation } = GetOneAffiliationAPI({
    code: `${partner ?? ''}`,
    eventId: item?.id,
  });

  const {
    isLoading: isLoadingTickets,
    isError: isErrorTickets,
    data: dataTickets,
    isFetchingNextPage: isFetchingNextPageTickets,
    hasNextPage: hasNextPageTickets,
    fetchNextPage: fetchNextPageTickets,
  } = GetInfiniteTicketsAPI({
    take: 10,
    sort: 'ASC',
    eventId: item?.id,
    eventDateId: eventDate?.id,
  });

  const {
    isError: isErrorUser,
    isLoading: isLoadingUser,
    data: user,
  } = GetOneUserPublicAPI({
    username: item?.profile?.username,
    organizationVisitorId: userStorage?.organizationId,
  });

  const ticketJsonParse = watchAmount
    ? JSON.parse(watchAmount)
    : eventDate?.oneTicket;
  const calculatePrice = Number(ticketJsonParse?.amount) * increment;
  const newAmount: NewAmountType = {
    quantity: increment,
    ticket: ticketJsonParse,
    currency: item?.currency?.code,
    value: calculatePrice,
    country: ipLocation?.countryCode,
    oneValue: Number(ticketJsonParse?.amount),
    taxes: Number(userStorage?.organization?.taxes),
  };

  const { timerRemaining } = useRedirectAfterSomeSeconds(
    `/events/${item?.slug}${partner ? `?partner=${partner}` : ''}`,
    600,
  );

  return (
    <>
      <LayoutCheckoutSite
        user={user}
        title={`Checkout - ${item?.title ?? 'events'}`}
      >
        <div className="max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mt-2 grid grid-cols-1 gap-y-10 sm:mt-12 sm:grid-cols-1 sm:gap-8 lg:grid-cols-5 lg:items-start lg:gap-x-10 xl:grid-cols-6 xl:gap-x-10">
              {isLoadingEvent || isLoadingUser || isLoadingEventDate ? (
                <EventCheckoutSkeleton />
              ) : item?.id ? (
                <Fragment>
                  <div className="g:col-span-3 xl:col-span-4">
                    <div className="flow-root">
                      <div
                        key={item?.id}
                        className="my-8 overflow-hidden rounded-lg border bg-white dark:border-input dark:bg-background"
                      >
                        <div className="p-8 sm:px-8 sm:py-7">
                          {item?.uploadsImages?.length > 0 ? (
                            <div className="group relative mx-auto mt-2 justify-center text-center">
                              <ListCarouselUpload
                                uploads={item?.uploadsImages}
                                folder={String(item?.model.toLocaleLowerCase())}
                                height="200px"
                              />
                            </div>
                          ) : null}

                          {item?.title ? (
                            <div className="my-2 text-lg font-bold">
                              {item?.title ?? ''}
                            </div>
                          ) : null}

                          <div className="relative mt-4 shrink-0 cursor-pointer">
                            <div className="flex items-center">
                              <div className="flex shrink-0 items-center font-bold">
                                <span className="text-xl">
                                  {eventDate?.oneTicket?.id ? (
                                    <>
                                      {formatePrice({
                                        currency: `${eventDate?.oneTicket?.currency?.code}`,
                                        value: Number(newAmount?.oneValue ?? 0),
                                        isDivide: false,
                                      })}{' '}
                                      x {increment}
                                    </>
                                  ) : (
                                    'Free'
                                  )}
                                </span>
                              </div>

                              <div className="ml-auto hidden font-bold text-blue-600 lg:table-cell">
                                <span className="text-lg">
                                  {capitalizeFirstLetter(
                                    formateToRFC2822(
                                      eventDate?.expiredAt,
                                      locale,
                                    ),
                                  )}
                                </span>
                                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-2 text-sm">
                                  {eventDate?.timeInit ?? ''}
                                </span>
                                {eventDate?.timeEnd ? (
                                  <>
                                    <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                      -
                                    </span>
                                    <span className="ml-1.5 text-sm">
                                      {eventDate?.timeEnd ?? ''}
                                    </span>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="relative mt-4 shrink-0 cursor-pointer">
                            <div className="hidden items-center lg:table-cell">
                              <div className="flex shrink-0 font-bold">
                                <span className="text-lg">
                                  {capitalizeFirstLetter(
                                    eventDate?.address ?? '',
                                  )}
                                </span>
                                <span className="ml-2 text-lg text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-2 text-lg">
                                  {capitalizeFirstLetter(eventDate?.city ?? '')}
                                </span>
                                <span className="ml-2 text-lg text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-2 text-lg">
                                  {capitalizeFirstLetter(
                                    eventDate?.country ?? '',
                                  )}
                                </span>
                              </div>
                            </div>

                            <div className="text-lg lg:hidden">
                              <div className="flex font-bold">Date</div>
                              <div className="ml-auto font-bold text-blue-600">
                                <span>
                                  {capitalizeFirstLetter(
                                    formateToRFC2822(
                                      eventDate?.expiredAt,
                                      locale,
                                    ),
                                  )}
                                </span>
                                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-2 text-sm">
                                  {eventDate?.timeInit ?? ''}
                                </span>
                                {eventDate?.timeEnd ? (
                                  <>
                                    <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                      -
                                    </span>
                                    <span className="ml-1.5 text-sm">
                                      {eventDate?.timeEnd ?? ''}
                                    </span>
                                  </>
                                ) : null}
                              </div>
                            </div>

                            <div className="mt-4 text-lg lg:hidden">
                              <div className="flex font-bold">Location</div>
                              <div className="ml-auto font-bold">
                                <span className="text-sm">
                                  {capitalizeFirstLetter(
                                    eventDate?.address ?? '',
                                  )}
                                </span>
                                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-2 text-sm">
                                  {capitalizeFirstLetter(eventDate?.city ?? '')}
                                </span>
                                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-1.5 text-sm">
                                  {capitalizeFirstLetter(
                                    eventDate?.country ?? '',
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* <div className="mt-2 sm:flex sm:items-center sm:justify-between">
                            <div className="py-2 sm:mt-0">
                              <p className="font-bold">
                                Please select the date
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 space-y-4">
                            <ListEventDatesForEventDate
                              event={{ id: item?.id, slug: item?.slug }}
                            />
                          </div> */}

                          <div className="mt-2 sm:flex sm:items-center sm:justify-between">
                            <div className="py-2 sm:mt-0">
                              <p className="font-bold dark:text-gray-600">
                                Please select the seat category
                              </p>
                            </div>
                            <div className="mt-2 py-2 sm:mt-0">
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
                            {isLoadingTickets ? (
                              <LoadingFile />
                            ) : isErrorTickets ? (
                              <ErrorFile
                                title="404"
                                description="Error find data please try again"
                              />
                            ) : Number(dataTickets?.pages[0]?.data?.total) <=
                              0 ? (
                              <div>
                                <label
                                  htmlFor={`ticket`}
                                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-input p-4 text-sm font-medium shadow-sm hover:border-blue-500 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500 dark:bg-background"
                                >
                                  <p className="text-gray-700 dark:text-gray-200">
                                    Free
                                  </p>
                                </label>
                              </div>
                            ) : (
                              dataTickets?.pages.map((page, index: number) => (
                                <Fragment key={index}>
                                  {page?.data?.value.map(
                                    (ticket: TicketModel, index: number) => (
                                      <div key={index}>
                                        <label
                                          htmlFor={ticket?.id}
                                          className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-input p-4 text-sm font-semibold shadow-sm hover:-translate-y-1 hover:border-blue-600 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600 dark:bg-background dark:hover:border-blue-600"
                                        >
                                          <div className="sm:flex sm:items-center sm:justify-between">
                                            <div className="sm:mt-0">
                                              <p className="font-bold text-gray-700 dark:text-gray-200">
                                                {ticket?.name}
                                              </p>

                                              {ticket?.description ? (
                                                <div
                                                  className={`group relative mt-2 text-sm font-normal text-gray-600 dark:text-gray-300`}
                                                >
                                                  <HtmlParser
                                                    html={String(
                                                      ticket?.description ?? '',
                                                    )}
                                                  />
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>

                                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {formatePrice({
                                              currency: `${item?.currency?.code}`,
                                              value: Number(
                                                ticket?.amount ?? 0,
                                              ),
                                              isDivide: false,
                                            })}
                                          </p>

                                          <input
                                            type="radio"
                                            {...register('amount')}
                                            value={JSON.stringify(ticket)}
                                            id={ticket?.id}
                                            className="sr-only"
                                            defaultChecked={
                                              index === 0 ? true : false
                                            }
                                          />
                                        </label>
                                      </div>
                                    ),
                                  )}
                                </Fragment>
                              ))
                            )}
                            {hasNextPageTickets && (
                              <div className="mx-auto mt-2 justify-center text-center">
                                <ButtonLoadMore
                                  size="sm"
                                  className="mx-[200px]"
                                  hasNextPage={hasNextPageTickets}
                                  isFetchingNextPage={isFetchingNextPageTickets}
                                  onClick={() => fetchNextPageTickets()}
                                />
                              </div>
                            )}
                          </div>

                          <hr className="mt-8 dark:border-gray-800" />
                          <div className="py-2">
                            <div className="flex items-center">
                              <h2 className="text-base font-bold dark:text-gray-600">
                                Contact
                              </h2>
                              {userAddress?.isUpdated && userAddress?.email && (
                                <ButtonInput
                                  type="button"
                                  size="sm"
                                  variant={isEdit ? 'primary' : 'outline'}
                                  onClick={() => setIsEdit((i: boolean) => !i)}
                                  className="ml-auto"
                                >
                                  {isEdit ? 'Edit address' : 'Cancel'}
                                </ButtonInput>
                              )}
                            </div>
                          </div>
                          <CreateOrUpdateUserAddressForm
                            isEdit={isEdit}
                            setIsEdit={setIsEdit}
                            userAddress={userAddress}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:sticky lg:top-6 lg:order-2 lg:col-span-2">
                    <div className="mt-8 flex items-center">
                      <h2 className="text-base font-bold">Checkout</h2>
                      <ButtonInput
                        type="button"
                        variant="outline"
                        className="ml-auto w-[80px]"
                        icon={
                          <span className="relative flex size-4">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex size-4 rounded-full bg-green-500"></span>
                          </span>
                        }
                      >
                        <span className="font-bold">{timerRemaining}</span>
                      </ButtonInput>
                    </div>
                    <div className="mt-4 overflow-hidden rounded-lg border bg-white dark:border-input dark:bg-background">
                      <div className="p-4 sm:p-6 lg:p-8">
                        <h3 className="font-bold dark:text-white">Riepilogo</h3>

                        <li className="mb-4 mt-2 flex items-center justify-between text-sm font-semibold">
                          <span className="text-sm text-blue-600">
                            {formateDate(eventDate?.expiredAt, locale)}
                          </span>
                          <p className="ml-auto text-blue-600">
                            <span className="text-sm">
                              {eventDate?.timeInit ?? ''}
                            </span>
                            {eventDate?.timeEnd ? (
                              <>
                                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-1.5 text-sm">
                                  {eventDate?.timeEnd ?? ''}
                                </span>
                              </>
                            ) : null}
                          </p>
                        </li>

                        <li className="mb-2 flex items-center justify-between text-sm">
                          <p className="dark:text-gray-600">
                            {increment} {item?.title}{' '}
                          </p>

                          {newAmount?.value ? (
                            <>
                              <p className="ml-1 text-sm dark:text-gray-400">
                                {formatePrice({
                                  currency: `${item?.currency?.code}`,
                                  value: Number(newAmount?.value),
                                  isDivide: false,
                                }) ?? ''}
                              </p>
                            </>
                          ) : (
                            'Free'
                          )}
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
                              <p className="ml-1 text-2xl font-bold dark:text-white">
                                {formatePrice({
                                  currency: `${item?.currency?.code}`,
                                  value: Number(newAmount?.value),
                                  isDivide: false,
                                }) ?? ''}
                              </p>
                            </>
                          ) : (
                            'Free'
                          )}
                        </li>
                      </div>
                    </div>

                    {ticketJsonParse?.enableOnlinePayment &&
                    isEdit &&
                    userAddress?.isUpdated &&
                    newAmount?.value ? (
                      <div className="mt-2 overflow-hidden rounded-lg border bg-white dark:border-input dark:bg-background">
                        <div className="p-4 sm:p-4 lg:p-3">
                          <div className="font-extrabold">Payment method</div>
                          <div className="mt-4 space-y-4">
                            {paymentMethodArray.map((lk, index) => (
                              <div key={index}>
                                <label
                                  htmlFor={lk?.value}
                                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-input p-4 text-sm font-medium shadow-sm hover:border-blue-600 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600 dark:bg-background dark:hover:border-blue-600"
                                >
                                  <p className="text-gray-700 dark:text-gray-200">
                                    {lk?.name}
                                  </p>

                                  <p className="text-gray-700 dark:text-white">
                                    {lk?.image}
                                  </p>
                                  <input
                                    type="radio"
                                    {...register('paymentMethod')}
                                    value={lk?.value}
                                    id={lk?.value}
                                    className="sr-only"
                                    required
                                  />
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {isEdit ? (
                      <>
                        {eventDate?.oneTicket?.id ? (
                          <>
                            <>
                              {isValid &&
                              newAmount?.value &&
                              watchPaymentMethod &&
                              ticketJsonParse?.enableOnlinePayment ? (
                                <>
                                  {watchPaymentMethod === 'STRIPE' ? (
                                    <CreateCardStripe
                                      paymentModel="STRIPE-EVENT"
                                      data={{
                                        userAddress,
                                        eventId: item?.id,
                                        amount: newAmount,
                                        eventDateId: eventDate?.id,
                                        affiliation: affiliation,
                                        organizationSellerId:
                                          item?.organizationId,
                                        organizationBuyerId:
                                          userStorage?.organizationId,
                                      }}
                                    />
                                  ) : null}

                                  {watchPaymentMethod === 'PAYPAL' ? (
                                    <CreatePaymentPayPal
                                      paymentModel="PAYPAL-EVENT"
                                      data={{
                                        userAddress,
                                        eventDateId: eventDate?.id,
                                        eventId: item?.id,
                                        amount: newAmount,
                                        affiliation: affiliation,
                                        organizationSellerId:
                                          item?.organizationId,
                                        organizationBuyerId:
                                          userStorage?.organizationId,
                                      }}
                                    />
                                  ) : null}
                                </>
                              ) : null}

                              {!ticketJsonParse?.enableOnlinePayment ? (
                                <CreatePaymentBooking
                                  paymentModel="BOOKING-EVENT"
                                  data={{
                                    userAddress,
                                    eventDateId: eventDate?.id,
                                    eventId: item?.id,
                                    amount: newAmount,
                                    affiliation: affiliation,
                                    organizationSellerId: item?.organizationId,
                                    organizationBuyerId:
                                      userStorage?.organizationId,
                                  }}
                                />
                              ) : null}
                            </>
                          </>
                        ) : (
                          <>
                            <CreatePaymentFree
                              paymentModel="FREE-EVENT"
                              data={{
                                userAddress,
                                eventId: item?.id,
                                eventDateId: eventDate?.id,
                                affiliation: affiliation,
                                amount: {
                                  quantity: 1,
                                  ticket: null,
                                  currency: 'USD',
                                  value: 0,
                                  country: ipLocation?.countryCode,
                                  oneValue: Number(ticketJsonParse?.amount),
                                  taxes: Number(
                                    userStorage?.organization?.taxes,
                                  ),
                                },
                                organizationSellerId: item?.organizationId,
                                organizationBuyerId:
                                  userStorage?.organizationId,
                              }}
                            />
                          </>
                        )}
                      </>
                    ) : null}
                  </div>
                </Fragment>
              ) : null}
            </div>
            {isErrorUser || isErrorEvent || isErrorEventDate ? (
              <div className="items-center justify-center text-center">
                <ErrorFile
                  title="404"
                  description="Error find data please try again..."
                />
              </div>
            ) : null}

            <div className="items-center justify-center text-center">
              <p className="text-sm font-normal text-gray-500">
                All the taxes will be calculated while checkout
              </p>
            </div>
          </div>
          <MediumFooter />
        </div>
      </LayoutCheckoutSite>
    </>
  );
};
export default PrivateComponent(CheckoutEvent);
