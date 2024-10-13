'use client';

import { GetOneAffiliationAPI } from '@/api-site/affiliation';
import { GetOneEventAPI } from '@/api-site/event';
import { GetOneEventDateAPI } from '@/api-site/event-date';
import { GetAllCountiesAPI } from '@/api-site/profile';
import { GetInfiniteTicketsAPI } from '@/api-site/ticket';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { GetOneUserAddressMeAPI } from '@/api-site/user-address';
import { MediumFooter } from '@/components/footer/medium-footer';
import { useInputState, useRedirectAfterSomeSeconds } from '@/components/hooks';
import { LayoutCheckoutSite } from '@/components/layouts/checkout-site';
import { CreatePaymentBooking } from '@/components/payment/create-payment-booking';
import { CreatePaymentFree } from '@/components/payment/create-payment-free';
import { CreatePaymentPayPal } from '@/components/payment/create-payment-paypal';
import { CreatePaymentStripe } from '@/components/payment/create-payment-stripe';
import { EventCheckoutSkeleton } from '@/components/skeleton/event-checkout-skeleton';
import {
  ButtonInput,
  ButtonLoadMore,
  ErrorFile,
  LoadingFile,
} from '@/components/ui-setting';
import { ListCarouselUploadMini } from '@/components/ui-setting/list-carousel-upload-mini';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CreateOrUpdateUserAddressForm } from '@/components/user-address/create-or-update-user-address-form';
import { PrivateComponent } from '@/components/util/private-component';
import { TicketModel } from '@/types/ticket';
import {
  formateDate,
  formatePrice,
  formateToRFC2822,
  useDebounce,
} from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { capitalizeFirstLetter } from '@/utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import * as yup from 'yup';

type NewAmountType = {
  country: string;
  quantity: number;
  currency: string;
  value: number;
  ticketId: string;
  oneValue: number;
  taxes: number;
  eventDate: {
    id: string;
    expiredAt: Date;
    startedAt: Date;
  };
  valueTotal: number;
  commission: number;
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
  const addressRef = useRef<any>(null);
  const [increment, setIncrement] = useState(1);
  const debounceIncrement = useDebounce(increment, 500);
  const { t, ipLocation, userStorage, locale, scrollToBottom } =
    useInputState();
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
  const { data: countries } = GetAllCountiesAPI();
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
    slugOrId: eventDate?.eventId,
  });

  const { data: affiliation } = GetOneAffiliationAPI({
    eventId: item?.id,
    code: String(partner),
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
  const calculateCommission =
    Number(Number(ticketJsonParse?.commission) * debounceIncrement) ?? 0;
  const calculatePrice = Number(ticketJsonParse?.amount) * debounceIncrement;

  const newAmount: NewAmountType = {
    quantity: debounceIncrement,
    ticketId: ticketJsonParse?.id,
    currency: item?.currency?.code,
    value: calculatePrice,
    country: ipLocation?.countryCode,
    oneValue: Number(ticketJsonParse?.amount),
    commission: calculateCommission,
    taxes: Number(userStorage?.organization?.taxes),
    valueTotal: calculateCommission + calculatePrice,
    eventDate: {
      id: eventDate?.id,
      expiredAt: eventDate?.expiredAt,
      startedAt: eventDate?.startedAt,
    },
  };

  const { timerRemaining } = useRedirectAfterSomeSeconds(
    `/events/${item?.slug}${partner ? `?partner=${partner}` : ''}`,
    600,
  );

  const scrollToElement = () => {
    if (addressRef.current) {
      addressRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    isEdit ? scrollToElement() : null;
  }, [isEdit]);

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
                  <div className="lg:col-span-3 xl:col-span-4">
                    <div className="flow-root">
                      <div
                        key={item?.id}
                        className="dark:border-input dark:bg-background my-8 overflow-hidden rounded-lg border border-gray-100 bg-white"
                      >
                        <div className="p-8 sm:px-8 sm:py-7">
                          {item?.uploadsImages?.length > 0 ? (
                            <div className="group relative mx-auto mt-2 justify-center text-center">
                              <ListCarouselUploadMini
                                uploads={item?.uploadsImages}
                                folder={String(item?.model.toLocaleLowerCase())}
                                height="250px"
                              />
                            </div>
                          ) : null}

                          <li className="mt-2 flex items-center justify-between font-semibold">
                            <p className="font-bold">
                              {increment} x {item?.title ?? ''}
                            </p>
                            <p className="text-lg text-blue-600">
                              {eventDate?.oneTicket?.amount > 0 ? (
                                <>
                                  {formatePrice({
                                    currency: `${eventDate?.oneTicket?.currency?.code}`,
                                    value: Number(newAmount?.oneValue ?? 0),
                                  })}
                                </>
                              ) : (
                                t.formatMessage({ id: 'UTIL.FREE' })
                              )}
                            </p>
                          </li>

                          <div className="mt-2 items-center justify-between">
                            <span>
                              {capitalizeFirstLetter(
                                formateToRFC2822(eventDate?.startedAt, locale),
                              )}
                            </span>
                            <span className="ml-1.5 text-gray-400 dark:text-gray-600">
                              -
                            </span>
                            <span className="ml-2">
                              {eventDate?.timeInit ?? ''}
                            </span>
                            {eventDate?.timeEnd ? (
                              <>
                                <span className="ml-1.5 text-gray-400 dark:text-gray-600">
                                  -
                                </span>
                                <span className="ml-1.5">
                                  {eventDate?.timeEnd ?? ''}
                                </span>
                              </>
                            ) : null}
                          </div>

                          <div className="mt-1.5">
                            <span>
                              {capitalizeFirstLetter(eventDate?.address ?? '')}
                            </span>
                            <span className="ml-1.5 text-gray-400 dark:text-gray-600">
                              -
                            </span>
                            <span className="ml-2">
                              {capitalizeFirstLetter(eventDate?.city ?? '')}
                            </span>
                            <span className="ml-1.5 text-gray-400 dark:text-gray-600">
                              -
                            </span>
                            <span className="ml-1.5">
                              {capitalizeFirstLetter(eventDate?.country ?? '')}
                            </span>
                          </div>

                          <li className="mt-4 flex items-center justify-between text-sm font-semibold">
                            <p className="text-gray-600">Unique place</p>
                            <p className="text-gray-600">
                              {ticketJsonParse?.price ? (
                                <>
                                  {formatePrice({
                                    currency: `${item?.currency?.code}`,
                                    value: ticketJsonParse?.price,
                                  }) ?? ''}
                                </>
                              ) : (
                                t.formatMessage({ id: 'UTIL.FREE' })
                              )}
                            </p>
                          </li>

                          {ticketJsonParse?.preSale > 0 ? (
                            <li className="mt-2 flex items-center justify-between text-sm font-semibold">
                              <p className="text-gray-600">Pre-sale</p>
                              <p className="text-gray-600">
                                {ticketJsonParse?.price ? (
                                  <>
                                    {formatePrice({
                                      currency: `${item?.currency?.code}`,
                                      value: ticketJsonParse?.preSale,
                                    }) ?? ''}
                                  </>
                                ) : (
                                  t.formatMessage({ id: 'UTIL.FREE' })
                                )}
                              </p>
                            </li>
                          ) : null}

                          <div className="mt-2 sm:flex sm:items-center sm:justify-between">
                            <div className="py-2 sm:mt-0">
                              <p className="font-bold">
                                Please select the seat category
                              </p>
                            </div>
                            <div className="mt-2 py-2 sm:mt-0">
                              <div className="dark:border-input flex items-center rounded border border-gray-200">
                                <ButtonInput
                                  size="sm"
                                  type="button"
                                  variant="primary"
                                  className="w-full"
                                  disabled={increment === 1 ? true : false}
                                  onClick={() => setIncrement((lk) => lk - 1)}
                                  icon={<MinusIcon className="size-5" />}
                                />

                                <Input
                                  type="number"
                                  id="increment"
                                  value={increment}
                                  className="h-8 w-20 border-transparent text-center [-moz-appearance:_textfield]"
                                />
                                <ButtonInput
                                  size="sm"
                                  type="button"
                                  variant="primary"
                                  className="w-full"
                                  loading={false}
                                  onClick={() => setIncrement((lk) => lk + 1)}
                                  icon={<PlusIcon className="size-5" />}
                                  disabled={increment >= 10}
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
                              <div className="border-input dark:bg-background flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 text-sm font-medium shadow-sm hover:border-blue-500 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
                                <p className="text-gray-700 dark:text-gray-200">
                                  {t.formatMessage({ id: 'UTIL.FREE' })}
                                </p>
                              </div>
                            ) : (
                              dataTickets?.pages.map((page, index: number) => (
                                <Fragment key={index}>
                                  {page?.data?.value.map(
                                    (ticket: TicketModel, index: number) => {
                                      const leftTicket = Number(ticket?.left);
                                      return (
                                        <div key={index}>
                                          <label
                                            htmlFor={ticket?.id}
                                            className={`${leftTicket <= 0 ? 'pointer-events-none opacity-50' : ''} border-input  dark:bg-background flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 text-sm font-semibold shadow-sm hover:border-blue-600 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600`}
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
                                                        ticket?.description ??
                                                          '',
                                                      )}
                                                    />
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>

                                            <div className="sm:mt-0">
                                              <p className="text-right text-lg font-bold text-gray-900 dark:text-white">
                                                {ticket?.amount > 0
                                                  ? formatePrice({
                                                      currency: `${item?.currency?.code}`,
                                                      value: Number(
                                                        ticket?.amount ?? 0,
                                                      ),
                                                    })
                                                  : t.formatMessage({
                                                      id: 'UTIL.FREE',
                                                    })}
                                              </p>
                                              {leftTicket <= 0 ? (
                                                <Badge
                                                  className="mt-1 rounded-sm uppercase"
                                                  variant="danger"
                                                >
                                                  Sold out
                                                </Badge>
                                              ) : null}
                                            </div>

                                            <input
                                              type="radio"
                                              {...register('amount')}
                                              value={JSON.stringify(ticket)}
                                              id={ticket?.id}
                                              className="sr-only"
                                              onClick={() => {
                                                scrollToElement();
                                              }}
                                              defaultChecked={
                                                leftTicket >= 0 && index === 0
                                                  ? true
                                                  : false
                                              }
                                            />
                                          </label>
                                        </div>
                                      );
                                    },
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
                          <hr className="dark:border-input mt-8" />
                          <div className="py-2" ref={addressRef}>
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
                            isContinue={
                              watchAmount ||
                              Number(dataTickets?.pages[0]?.data?.total) <= 0
                            }
                            setIsEdit={setIsEdit}
                            userAddress={userAddress}
                            countries={countries}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:sticky lg:top-6 lg:order-2 lg:col-span-2">
                    <div className="mt-8 flex items-center">
                      <p className="text-2xl font-bold">Checkout</p>
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
                    <div className="dark:border-input dark:bg-background mt-4 overflow-hidden rounded-lg border border-gray-100 bg-white">
                      <div className="p-4 sm:p-6 lg:p-8">
                        <h3 className="font-bold dark:text-white">Riepilogo</h3>

                        <li className="mb-4 mt-2 flex items-center justify-between text-sm font-semibold">
                          <span className="text-sm text-blue-600">
                            {formateDate(eventDate?.startedAt, locale)}
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
                            {increment} {item?.title}
                          </p>

                          {newAmount?.value ? (
                            <>
                              <p className="ml-1 text-sm dark:text-gray-400">
                                {formatePrice({
                                  currency: `${item?.currency?.code}`,
                                  value: Number(newAmount?.value),
                                }) ?? ''}
                              </p>
                            </>
                          ) : (
                            t.formatMessage({ id: 'UTIL.FREE' })
                          )}
                        </li>

                        {newAmount?.commission > 0 ? (
                          <li className="mb-2 flex items-center justify-between text-sm">
                            <p className="dark:text-gray-600">Commissions</p>
                            <p className="ml-1 text-sm dark:text-gray-400">
                              {formatePrice({
                                currency: `${item?.currency?.code}`,
                                value: newAmount?.commission,
                              }) ?? ''}
                            </p>
                          </li>
                        ) : null}

                        {/* <hr className="my-4 dark:border-input" />

                <li className="flex items-center justify-between text-sm">
                  <p className="dark:text-gray-600">Commissioni di servizio</p>
                  <p className="ml-auto dark:text-gray-400">
                    € 3,00
                  </p>
                </li> */}
                        <hr className="dark:border-input my-4" />

                        <li className="my-2 flex items-center justify-between">
                          <p className="text-3xl font-medium dark:text-white">
                            Total
                          </p>
                          <p className="text-2xl font-bold dark:text-white">
                            {newAmount?.value ? (
                              <>
                                {formatePrice({
                                  currency: `${item?.currency?.code}`,
                                  value: Number(newAmount?.valueTotal),
                                  isDivide: false,
                                })}
                              </>
                            ) : (
                              t.formatMessage({ id: 'UTIL.FREE' })
                            )}
                          </p>
                        </li>
                      </div>
                    </div>

                    {ticketJsonParse?.isOnlinePayment &&
                    isEdit &&
                    userAddress?.isUpdated &&
                    newAmount?.valueTotal ? (
                      <div className="dark:border-input dark:bg-background mt-2 overflow-hidden rounded-lg border border-gray-100 bg-white">
                        <div className="p-4 sm:p-4 lg:p-3">
                          <div className="font-bold">Select payment method</div>
                          <div className="mt-4 space-y-4">
                            {paymentMethodArray.map((lk, index) => (
                              <div key={index}>
                                <label
                                  htmlFor={lk?.value}
                                  className="border-input dark:bg-background flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 text-sm font-medium shadow-sm hover:border-blue-600 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600 dark:hover:border-blue-600"
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
                              newAmount?.valueTotal &&
                              watchPaymentMethod &&
                              ticketJsonParse?.isOnlinePayment ? (
                                <>
                                  {watchPaymentMethod === 'STRIPE' ? (
                                    <CreatePaymentStripe
                                      paymentModel="STRIPE-CHECKOUT-SESSION-EVENT"
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
                                        userId: userStorage?.id,
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
                                        userId: userStorage?.id,
                                      }}
                                    />
                                  ) : null}
                                </>
                              ) : null}

                              {!ticketJsonParse?.isOnlinePayment ? (
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
                                    userId: userStorage?.id,
                                  }}
                                />
                              ) : null}

                              {newAmount?.valueTotal <= 0 ? (
                                <CreatePaymentFree
                                  paymentModel="FREE-EVENT"
                                  data={{
                                    userAddress,
                                    eventId: item?.id,
                                    eventDateId: eventDate?.id,
                                    affiliation: affiliation,
                                    amount: newAmount,
                                    organizationSellerId: item?.organizationId,
                                    organizationBuyerId:
                                      userStorage?.organizationId,
                                    userId: userStorage?.id,
                                  }}
                                />
                              ) : null}
                            </>
                          </>
                        ) : null}
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
