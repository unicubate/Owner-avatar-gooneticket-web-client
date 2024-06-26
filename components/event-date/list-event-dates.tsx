/* eslint-disable jsx-a11y/anchor-is-valid */
import { EventDateModel } from '@/types/event-date';
import { formateToCccc, formateToLLLL, formateTodd } from '@/utils';
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
  const { locale } = useInputState();

  return (
    <>
      <div key={index}>
        <label
          onClick={() =>
            push(
              `/checkouts/${item?.id}/event${partner ? `?partner=${partner}` : ''}`,
            )
          }
          htmlFor={`${item?.id}`}
          className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm hover:border-blue-600 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600 dark:border-gray-600 dark:bg-[#04080b] dark:hover:border-blue-600"
        >
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:mt-0">
              <div className="flex items-center">
                <p className="text-4xl font-semibold text-blue-700">
                  {formateTodd(item?.expiredAt as Date, locale)}
                </p>
                <div className="ml-2 cursor-pointer">
                  <p className="tex-lg font-bold">
                    {capitalizeFirstLetter(
                      formateToLLLL(item?.expiredAt as Date, locale),
                    )}
                  </p>
                  <p className="mt-1 font-semibold text-gray-500">
                    {formateToCccc(item?.expiredAt as Date, locale)},{' '}
                    {item?.timeInit}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <p className="font-semibold uppercase">
                  {item?.city} - {item?.address}
                </p>
              </div>
            </div>
          </div>

          <div className="py-4">
            <Badge className="gap-1 rounded-sm" variant="primary">
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
