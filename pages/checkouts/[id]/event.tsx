'use client';

import { GetOneAffiliationAPI } from '@/api-site/affiliation';
import { GetOneEventAPI } from '@/api-site/event';
import { GetOneEventDateAPI } from '@/api-site/event-date';
import { GetAllCountiesAPI } from '@/api-site/profile';
import { GetInfiniteTicketsAPI } from '@/api-site/ticket';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { GetOneUserAddressMeAPI } from '@/api-site/user-address';
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
import {
  CheckCheckIcon,
  Edit3Icon,
  MinusIcon,
  MoveLeftIcon,
  PlusIcon,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { Fragment, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import * as yup from 'yup';

type NewAmountType = {
  country: string;
  currency: string;
  value: number;
  taxes: number;
  quantity: number;
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
  ticket: yup.string().required('ticket is a required field'),
});

interface TicketReq {
  id: string;
  name: string;
  quantity: number;
  amount: number;
  eventTitle: string;
}

const CheckoutEvent = () => {
  const addressRef = useRef<any>(null);
  const [increment, setIncrement] = useState(1);
  const debounceIncrement = useDebounce(increment, 500);
  const { t, ipLocation, user, locale } = useInputState();
  const { query, back } = useRouter();
  const { id: eventDateId, partner } = query;

  const {
    watch,
    register,
    formState: { isDirty, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { data: countries } = GetAllCountiesAPI();
  const watchTicket = watch('ticket', null);
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

  const { isError: isErrorUser, isLoading: isLoadingUser } =
    GetOneUserPublicAPI({
      username: item?.profile?.username,
      organizationVisitorId: user?.organizationId,
    });

  const ticketJsonParse = watchTicket
    ? JSON.parse(watchTicket)
    : eventDate?.oneTicket;
  const calculateCommission =
    Number(Number(ticketJsonParse?.commission) * debounceIncrement) ?? 0;
  const calculatePrice = Number(ticketJsonParse?.amount) * debounceIncrement;

  const newAmount: NewAmountType = {
    currency: item?.currency?.code,
    value: calculatePrice,
    quantity: debounceIncrement,
    country: ipLocation?.countryCode,
    commission: calculateCommission,
    taxes: Number(user?.organization?.taxes),
    valueTotal: calculateCommission + calculatePrice,
  };

  const tickets = [
    {
      id: ticketJsonParse?.id,
      name: ticketJsonParse?.name,
      quantity: debounceIncrement,
      amount: ticketJsonParse?.amount,
      eventTitle: ticketJsonParse?.event?.title,
      eventId: ticketJsonParse?.eventId,
      expiredAt: ticketJsonParse?.eventDate?.expiredAt,
      startedAt: ticketJsonParse?.eventDate?.startedAt,
      eventDateId: ticketJsonParse?.eventDateId,
    },
  ];

  const payload: any = {
    tickets: tickets,
    userAddress,
    eventDateIds: [eventDate?.id],
    eventDate: {
      id: eventDate?.id,
      expiredAt: eventDate?.expiredAt,
      startedAt: eventDate?.startedAt,
    },
    eventId: item?.id,
    amount: newAmount,
    affiliation: affiliation,
    organizationSellerId: item?.organizationId,
    organizationBuyerId: user?.organizationId,
    userId: user?.id,
  };

  const { timerRemaining } = useRedirectAfterSomeSeconds(
    `/events/${item?.slug}${partner ? `?partner=${partner}` : ''}`,
    600,
  );

  // const scrollToElement = () => {
  //   // if (addressRef.current) {
  //   //   addressRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   // }
  // };

  // useEffect(() => {

  // }, []);

  console.log('tickets ====>', tickets);
  return (
    <>
      <LayoutCheckoutSite
        user={user}
        title={`Checkout - ${item?.title ?? 'events'}`}
      >
        <div className="max-w-8xl px-4 py-6">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mt-2 grid grid-cols-1 gap-y-10 sm:mt-12 sm:grid-cols-1 sm:gap-8 lg:grid-cols-5 lg:items-start lg:gap-x-10 xl:grid-cols-6 xl:gap-x-10">
              {isLoadingEvent || isLoadingUser || isLoadingEventDate ? (
                <EventCheckoutSkeleton />
              ) : item?.id ? (
                <Fragment>
                  <div className="lg:col-span-3 xl:col-span-4">
                    <div className="flow-root">
                      <div className="flex items-center">
                        <div className="sm:mt-0">
                          <ButtonInput
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => back()}
                            icon={<MoveLeftIcon className="size-4" />}
                          >
                            {t.formatMessage({ id: 'UTIL.COME_BACK' })}
                          </ButtonInput>
                        </div>
                      </div>
                      <div
                        key={item?.id}
                        className="dark:border-input dark:bg-background my-2 overflow-hidden rounded-lg border border-gray-100 bg-white"
                      >
                        <div className="p-8 sm:px-8 sm:py-7">
                          {item?.uploadImages?.length > 0 ? (
                            <div className="group relative mx-auto mt-2 justify-center text-center">
                              <ListCarouselUploadMini
                                uploads={item?.uploadImages}
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
                              {eventDate?.oneTicket?.amount > 0
                                ? formatePrice({
                                    currency: `${eventDate?.oneTicket?.currency?.code}`,
                                    value: Number(tickets[0]?.amount ?? 0),
                                  })
                                : t.formatMessage({ id: 'UTIL.FREE' })}
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
                                  disabled={increment <= 1}
                                  onClick={() => setIncrement((lk) => lk - 1)}
                                  icon={<MinusIcon className="size-5" />}
                                />

                                <Input
                                  type="number"
                                  id="increment"
                                  value={increment}
                                  className="h-8 w-14 border-transparent text-center [-moz-appearance:_textfield]"
                                />
                                <ButtonInput
                                  size="sm"
                                  type="button"
                                  variant="primary"
                                  className="w-full"
                                  loading={false}
                                  onClick={() => setIncrement((lk) => lk + 1)}
                                  icon={<PlusIcon className="size-5" />}
                                  disabled={
                                    increment >= 10 || !isValid || !isDirty
                                  }
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
                                            className={`${leftTicket <= 0 ? 'pointer-events-none opacity-50' : ''} active:scale-105 border-input  dark:bg-background flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 text-sm font-semibold shadow-sm hover:border-blue-600 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600`}
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

                                              {!ticket?.isOnlinePayment ? (
                                                <Badge
                                                  className="mt-1 ml-1.5 rounded-sm uppercase"
                                                  variant="secondary"
                                                >
                                                  {t.formatMessage({
                                                    id: 'UTIL.RESERVE',
                                                  })}
                                                </Badge>
                                              ) : null}
                                            </div>

                                            <input
                                              type="radio"
                                              {...register('ticket')}
                                              value={JSON.stringify(ticket)}
                                              id={ticket?.id}
                                              className="sr-only"
                                              // onClick={() => {
                                              //   //scrollToElement();
                                              // }}
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
                                  icon={
                                    isEdit ? (
                                      <Edit3Icon className="size-4" />
                                    ) : (
                                      <CheckCheckIcon className="size-4" />
                                    )
                                  }
                                >
                                  {isEdit ? 'Edit address' : 'Cancel'}
                                </ButtonInput>
                              )}
                            </div>
                          </div>
                          <CreateOrUpdateUserAddressForm
                            isEdit={isEdit}
                            isContinue={
                              watchTicket ||
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
                        <h3 className="font-bold">Riepilogo</h3>

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

                        {tickets.map((lk: TicketReq, index: number) => (
                          <li
                            key={index}
                            className="mt-2 flex items-center justify-between text-sm"
                          >
                            <p className="dark:text-gray-600">
                              {lk?.quantity} {lk?.name}
                            </p>
                            <p className="ml-1 dark:text-gray-400">
                              {lk?.amount > 0
                                ? formatePrice({
                                    currency: item?.currency?.code,
                                    value: Number(lk?.amount),
                                  })
                                : t.formatMessage({ id: 'UTIL.FREE' })}
                            </p>
                          </li>
                        ))}

                        {newAmount?.commission > 0 ? (
                          <li className="mt-2 flex items-center justify-between text-sm">
                            <p className="dark:text-gray-600">Commissions</p>
                            <p className="ml-1 text-sm dark:text-gray-400">
                              {formatePrice({
                                currency: `${item?.currency?.code}`,
                                value: newAmount?.commission,
                              }) ?? ''}
                            </p>
                          </li>
                        ) : null}

                        {watchTicket && (isValid || isDirty) ? (
                          <>
                            <hr className="dark:border-input my-4" />
                            <li className="my-2 flex items-center justify-between">
                              <p className="text-3xl font-medium">Total</p>
                              <p className="text-2xl font-bold">
                                {newAmount?.valueTotal > 0
                                  ? formatePrice({
                                      currency: `${item?.currency?.code}`,
                                      value: Number(newAmount?.valueTotal),
                                    })
                                  : t.formatMessage({ id: 'UTIL.FREE' })}
                              </p>
                            </li>
                          </>
                        ) : null}
                      </div>
                    </div>

                    {ticketJsonParse?.isOnlinePayment &&
                    isEdit &&
                    userAddress?.isUpdated &&
                    newAmount?.valueTotal &&
                    tickets[0]?.eventDateId ? (
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

                    {watchTicket && isEdit ? (
                      <>
                        {eventDate?.oneTicket?.id ? (
                          <>
                            <>
                              {(isValid || isDirty) &&
                              tickets[0]?.eventDateId &&
                              watchPaymentMethod &&
                              ticketJsonParse?.isOnlinePayment ? (
                                <>
                                  {watchPaymentMethod === 'STRIPE' ? (
                                    <CreatePaymentStripe
                                      paymentModel="STRIPE-CHECKOUT-SESSION-EVENT"
                                      data={payload}
                                    />
                                  ) : null}

                                  {watchPaymentMethod === 'PAYPAL' ? (
                                    <CreatePaymentPayPal
                                      paymentModel="PAYPAL-EVENT"
                                      data={payload}
                                    />
                                  ) : null}
                                </>
                              ) : null}

                              {(isValid || isDirty) &&
                              !ticketJsonParse?.isOnlinePayment ? (
                                <CreatePaymentBooking
                                  paymentModel="BOOKING-EVENT"
                                  data={payload}
                                />
                              ) : null}

                              {newAmount?.valueTotal <= 0 ? (
                                <CreatePaymentFree
                                  paymentModel="FREE-EVENT"
                                  data={payload}
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
        </div>
      </LayoutCheckoutSite>
    </>
  );
};
export default PrivateComponent(CheckoutEvent);
