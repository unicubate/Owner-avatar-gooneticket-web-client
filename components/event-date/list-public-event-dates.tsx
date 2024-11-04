/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { EventDateModel } from '@/types/event-date';
import { formatePrice } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { capitalizeFirstLetter } from '@/utils/utils';
import { TicketPlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  formateToCccc,
  formateToLLLL,
  formateTodd,
  viewYyformateToYyyy,
} from '../../utils/formate-date';
import { useInputState } from '../hooks';
import { ButtonInput, CopyShareLink, SwiperImage } from '../ui-setting';

type Props = {
  item?: EventDateModel;
  index: number;
};

const ListPublicEventDates = ({ item, index }: Props) => {
  const { query, push } = useRouter();
  const { partner } = query;
  const [copied, setCopied] = useState(false);
  const { t, locale, user, ipLocation } = useInputState();

  const linkHrefCheckouts = `${
    user?.id
      ? `/checkouts/${item?.id}/event${partner ? `?partner=${partner}` : ''}`
      : `/login?redirect=${ipLocation?.url}/checkouts/${item?.id}/event${partner ? `?partner=${partner}` : ''}`
  }`;

  const linkHrefView = `/events/${item?.event?.slug}`;

  return (
    <>
      <div
        key={index}
        className="mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white px-2 dark:border-input dark:bg-background hover:border-blue-600 dark:hover:border-blue-600"
      >
        <Link href={linkHrefCheckouts}>
          <div className="divide-y divide-gray-200 dark:divide-gray-900">
            <div className="py-1">
              <div className="mt-1  cursor-pointer sm:hidden">
                <SwiperImage
                  height="160px"
                  src={`${viewOneFileUploadAPI({
                    folder: String(
                      item?.oneUploadsImage?.model.toLocaleLowerCase(),
                    ),
                    fileName: String(item?.oneUploadsImage?.path),
                  })}`}
                  alt={String(item?.event?.title)}
                />
              </div>
              <div className="mt-1 flex items-center">
                {item?.oneUploadsImage ? (
                  <div className="relative hidden shrink-0 cursor-pointer sm:table-cell">
                    <SwiperImage
                      height="80px"
                      width="100px"
                      src={`${viewOneFileUploadAPI({
                        folder: String(
                          item?.oneUploadsImage?.model.toLocaleLowerCase(),
                        ),
                        fileName: String(item?.oneUploadsImage?.path),
                      })}`}
                      alt={String(item?.event?.title)}
                    />
                  </div>
                ) : null}

                <div className="ml-1.5 min-w-0 flex-1">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:mt-0">
                      <div className="flex items-center">
                        <p className="text-5xl font-semibold text-blue-700">
                          {formateTodd(item?.expiredAt as Date, locale)}
                        </p>
                        <div className="tex-sm ml-1.5 text-sm font-bold">
                          <p className="mt-1">
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
                          {capitalizeFirstLetter(String(item?.country))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-auto py-2 text-right font-medium">
                  <div className="mt-1.5 hidden sm:block">
                    <ButtonInput
                      type="button"
                      variant="primary"
                      size="sm"
                      icon={<TicketPlusIcon className="size-6" />}
                    >
                      Ticket
                    </ButtonInput>

                    {/* <Button
                    className="text-gray-600 hover:text-gray-400 focus:ring-gray-900"
                    variant="link"
                    type="button"
                    size="icon"
                    onClick={() => setCopied(true)}
                  >
                    <ShareIcon className="size-5" />
                  </Button> */}
                  </div>
                </div>
              </div>

              <div className="mt-1.5 flex items-center">
                <Link
                  href={linkHrefView}
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
                </Link>
                <div className="ml-auto text-xl font-bold">
                  {Number(item?.oneTicket?.amount) > 0 ? (
                    <>
                      {formatePrice({
                        currency: `${item?.event?.currency?.code}`,
                        value: Number(item?.oneTicket?.amount ?? 0),
                        isDivide: false,
                      })}
                    </>
                  ) : (
                    t.formatMessage({ id: 'UTIL.FREE' })
                  )}
                </div>
              </div>
              <div className="mt-1.5 sm:hidden">
                <ButtonInput
                  type="button"
                  variant="primary"
                  className="w-full"
                  icon={<TicketPlusIcon className="size-6" />}
                >
                  Ticket
                </ButtonInput>
              </div>
            </div>

            {/**** Copy and delete *****/}
            <CopyShareLink
              isOpen={copied}
              setIsOpen={setCopied}
              link={`${process.env.NEXT_PUBLIC_SITE}/checkouts/${item?.id}/event`}
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export { ListPublicEventDates };
