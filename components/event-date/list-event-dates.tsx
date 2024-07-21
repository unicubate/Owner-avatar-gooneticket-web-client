/* eslint-disable jsx-a11y/anchor-is-valid */
import { EventDateModel } from '@/types/event-date';
import {
  formateToCccc,
  formateToLLLL,
  formateTodd,
  viewYyformateToYyyy,
} from '@/utils';
import { capitalizeFirstLetter } from '@/utils/utils';
import { TicketIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useInputState } from '../hooks';
import { Badge } from '../ui/badge';

type Props = {
  item?: EventDateModel;
  index: number;
};

const ListEventDates = ({ item, index }: Props) => {
  const { query, push } = useRouter();
  const { partner } = query;
  const { locale, userStorage, ipLocation } = useInputState();

  return (
    <>
      <div key={index}>
        <label
          onClick={() =>
            push(
              `${
                userStorage?.id
                  ? `/checkouts/${item?.id}/event${partner ? `?partner=${partner}` : ''}`
                  : `/login?redirect=${ipLocation?.url}/checkouts/${item?.id}/event${partner ? `?partner=${partner}` : ''}`
              }`,
            )
          }
          htmlFor={`${item?.id}`}
          className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm hover:-translate-y-1 hover:border-blue-600 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600 dark:border-gray-600 dark:bg-[#04080b] dark:hover:border-blue-600"
        >
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:mt-0">
              <div className="flex items-center">
                <p className="text-4xl font-semibold text-blue-700">
                  {formateTodd(item?.expiredAt as Date, locale)}
                </p>
                <div className="ml-2">
                  <p className="tex-lg font-bold">
                    {capitalizeFirstLetter(
                      formateToLLLL(item?.expiredAt as Date, locale),
                    )}
                    <span className="ml-1.5">
                      {viewYyformateToYyyy(item?.expiredAt as Date)}
                    </span>
                  </p>
                  <p className="mt-1 font-semibold">
                    <span>
                      {formateToCccc(item?.expiredAt as Date, locale)}
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

              <div className="mt-2">
                <p className="font-bold">
                  <span>{capitalizeFirstLetter(String(item?.address))}</span>
                  <span className="ml-1">-</span>
                  <span className="ml-1">
                    {capitalizeFirstLetter(String(item?.city))}
                  </span>
                  <span className="ml-1">-</span>
                  <span className="ml-1">
                    {capitalizeFirstLetter(String(item?.country?.name))}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="py-4">
            <Badge
              className="cursor-pointer gap-1  rounded-sm"
              variant="primary"
            >
              <TicketIcon className="size-6" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Tickets
              </span>
            </Badge>
          </div>

          <input
            type="radio"
            name="eventDate"
            value={`${item?.id}`}
            id={`${item?.id}`}
            className="sr-only"
          />
        </label>
      </div>
    </>
  );
};

export { ListEventDates };
