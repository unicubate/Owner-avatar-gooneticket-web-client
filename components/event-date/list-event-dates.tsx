/* eslint-disable jsx-a11y/anchor-is-valid */
import { EventDateModel } from '@/types/event-date';
import {
  formateToCccc,
  formateTodd,
  formateToLLLL,
  viewYyformateToYyyy,
} from '@/utils';
import { capitalizeFirstLetter } from '@/utils/utils';
import { TicketIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';

type Props = {
  item?: EventDateModel;
  index: number;
};

const ListEventDates = ({ item, index }: Props) => {
  const { query, push } = useRouter();
  const { partner } = query;
  const { locale, userStorage, ipLocation, loading, setLoading } =
    useInputState();

  return (
    <>
      <Link
        prefetch={true}
        href={`${
          userStorage?.id
            ? `/checkouts/${item?.id}/event${partner ? `?partner=${partner}` : ''}`
            : `/login?redirect=${ipLocation?.url}/checkouts/${item?.id}/event${partner ? `?partner=${partner}` : ''}`
        }`}
      >
        <div
          key={index}
          className="mt-2 cursor-pointer justify-between  gap-4 rounded-lg border border-input p-2 text-sm shadow-sm hover:border-blue-600 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600 dark:bg-background"
        >
          <div className="flex items-center py-1">
            <div className="min-w-0 flex-1">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:mt-0">
                  <div className="flex items-center">
                    <p className="text-5xl font-semibold text-blue-700">
                      {formateTodd(item?.expiredAt as Date, locale)}
                    </p>
                    <div className="tex-sm ml-1.5 font-semibold">
                      <p>
                        {capitalizeFirstLetter(
                          formateToLLLL(item?.expiredAt as Date, locale),
                        )}
                        <span className="ml-1.5">
                          {viewYyformateToYyyy(item?.expiredAt as Date)}
                        </span>
                      </p>

                      <p className="mt-1">
                        <span>
                          {capitalizeFirstLetter(
                            formateToCccc(item?.expiredAt as Date, locale),
                          )}
                        </span>
                        ,<span className="ml-1">{item?.timeInit}</span>
                        {item?.timeEnd ? (
                          <>
                            <span className="ml-1">-</span>
                            <span className="ml-1">{item?.timeEnd}</span>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>

                  <div className="mt-1.5 text-sm font-semibold">
                    <span>{capitalizeFirstLetter(String(item?.address))}</span>
                    <span className="ml-1">-</span>
                    <span className="ml-1">
                      {capitalizeFirstLetter(String(item?.city))}
                    </span>
                    <span className="ml-1">-</span>
                    <span className="ml-1">
                      {capitalizeFirstLetter(String(item?.country))}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  {/* <p className="text-right text-xl font-bold">
                    {item?.oneTicket?.id ? (
                      <>
                        {formatePrice({
                          currency: `${item?.oneTicket?.currency?.code}`,
                          value: Number(item?.oneTicket?.amount ?? 0),
                          isDivide: false,
                        })}
                      </>
                    ) : (
                      'Free'
                    )}
                  </p> */}
                  <ButtonInput
                    type="button"
                    variant="primary"
                    className="ml-auto mt-2 w-full"
                    size="sm"
                    icon={<TicketIcon className="size-6" />}
                  >
                    Ticket
                  </ButtonInput>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export { ListEventDates };
