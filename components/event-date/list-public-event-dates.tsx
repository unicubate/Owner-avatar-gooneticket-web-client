/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { EventDateModel } from '@/types/event-date';
import { formatePrice } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { capitalizeFirstLetter } from '@/utils/utils';
import { TicketIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  formateToCccc,
  formateToLLLL,
  formateTodd,
  viewYyformateToYyyy,
} from '../../utils/formate-date';
import { useInputState } from '../hooks';
import { CopyShareLink, SwiperImage } from '../ui-setting';
import { Badge } from '../ui/badge';

type Props = {
  item?: EventDateModel;
  index: number;
};

const ListPublicEventDates = ({ item, index }: Props) => {
  const { query, push } = useRouter();
  const { partner } = query;
  const [copied, setCopied] = useState(false);
  const { locale, userStorage, ipLocation } = useInputState();

  const handlerFindPage = () => {
    push(
      `${
        userStorage?.id
          ? `/checkouts/${item?.id}/event${partner ? `?partner=${partner}` : ''}`
          : `/login?redirect=${ipLocation?.url}/checkouts/${item?.id}/event${partner ? `?partner=${partner}` : ''}`
      }`,
    );
  };
  return (
    <>
      <div className="mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white px-2 hover:-translate-y-1 dark:border-gray-800 dark:bg-[#04080b]">
        <div className="cursor-pointer divide-y divide-gray-200 dark:divide-gray-800">
          <div key={index} className="py-2">
            <div className="flex items-center">
              {item?.oneUploadsImage ? (
                <a
                  href={void 0}
                  onClick={() => handlerFindPage()}
                  className="relative shrink-0"
                >
                  <SwiperImage
                    height="70px"
                    width="100px"
                    src={`${viewOneFileUploadAPI({
                      folder: String(
                        item?.oneUploadsImage?.model.toLocaleLowerCase(),
                      ),
                      fileName: String(item?.oneUploadsImage?.path),
                    })}`}
                    alt={String(item?.event?.title)}
                  />
                </a>
              ) : null}

              <div className="ml-2 min-w-0 flex-1">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="sm:mt-0">
                    <div className="flex items-center">
                      <p className="text-4xl font-semibold text-blue-700">
                        {formateTodd(item?.expiredAt as Date, locale)}
                      </p>
                      <div className="tex-sm ml-1.5">
                        <p className="font-bold">
                          {capitalizeFirstLetter(
                            formateToLLLL(item?.expiredAt as Date, locale),
                          )}
                          <span className="ml-1.5">
                            {viewYyformateToYyyy(item?.expiredAt as Date)}
                          </span>
                        </p>
                        <p className="mt-1 font-semibold">
                          {formateToCccc(item?.expiredAt as Date, locale)},
                          <span className="ml-1">{item?.timeInit}</span>
                          {item?.timeEnd ? (
                            <>
                              <span className="ml-1">-</span>
                              <span className="ml-1"> {item?.timeEnd}</span>
                            </>
                          ) : null}
                        </p>
                      </div>
                    </div>

                    <div className="mt-1.5 text-sm font-bold">
                      <span>
                        {capitalizeFirstLetter(String(item?.address))}
                      </span>
                      <span className="ml-1">-</span>
                      <span className="ml-1">
                        {capitalizeFirstLetter(String(item?.city))}
                      </span>
                      <span className="ml-1">-</span>
                      <span className="ml-1">
                        {capitalizeFirstLetter(String(item?.country?.name))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-auto py-2 text-right font-medium">
                <div className="text-lg font-bold">
                  {Number(item?.oneTicket?.amount) > 0 ? (
                    <span className="ml-1.5">
                      {formatePrice({
                        currency: `${item?.event?.currency?.code}`,
                        value: Number(item?.oneTicket?.amount ?? 0),
                        isDivide: false,
                      })}
                    </span>
                  ) : (
                    <span className="ml-2">Free</span>
                  )}
                </div>
                <div className="mt-4">
                  <Badge
                    className="cursor-pointer gap-1 rounded-sm"
                    variant="primary"
                    onClick={() => handlerFindPage()}
                  >
                    <TicketIcon className="size-6" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Tickets
                    </span>
                  </Badge>
                </div>
              </div>
            </div>

            {/* <div className="mt-1 lg:hidden">
              <div className="mt-1 flex items-center">
                <p className="text-4xl font-semibold text-blue-700">
                  {formateTodd(item?.createdAt as Date, locale)}
                </p>
                <div className="tex-sm ml-2 cursor-pointer">
                  <p className="font-bold">
                    {capitalizeFirstLetter(
                      formateToLLLL(item?.createdAt as Date, locale),
                    )}
                    <span className="ml-1.5">
                      {viewYyformateToYyyy(item?.createdAt as Date)}
                    </span>
                  </p>
                  <p className="mt-1 font-semibold">
                    {formateToCccc(item?.createdAt as Date, locale)}, 18:00 -
                    6:00
                  </p>
                </div>
              </div>

              <div className="mt-1 text-sm">
                <p className="font-bold">
                  {capitalizeFirstLetter(String('Italy'))} -{' '}
                  {capitalizeFirstLetter(String('Milan'))} -{' '}
                  {capitalizeFirstLetter(String('Via della costa'))}
                </p>
              </div>
            </div> */}
            <div className="mt-1 flex items-center">
              <a
                href={void 0}
                onClick={() => handlerFindPage()}
                className="hover:text-blue-600 dark:hover:text-blue-600"
              >
                {item?.event?.title ? (
                  <p className="font-bold">
                    <ReadMore
                      html={String(item?.event?.title ?? '')}
                      value={100}
                    />
                  </p>
                ) : null}
              </a>
            </div>
          </div>

          {/**** Copy and delete *****/}
          <CopyShareLink
            isOpen={copied}
            setIsOpen={setCopied}
            link={`${process.env.NEXT_PUBLIC_SITE}/events/${item?.event?.slug}`}
          />
        </div>
      </div>
    </>
  );
};

export { ListPublicEventDates };
