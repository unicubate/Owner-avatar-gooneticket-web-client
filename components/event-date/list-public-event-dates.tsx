/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { EventDateModel } from '@/types/event-date';
import { formatePrice } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { capitalizeFirstLetter } from '@/utils/utils';
import { TicketIcon } from 'lucide-react';
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
  const { locale, userStorage, ipLocation } = useInputState();

  const linkHrefCheckouts = `${
    userStorage?.id
      ? `/checkouts/${item?.id}/event${partner ? `?partner=${partner}` : ''}`
      : `/login?redirect=${ipLocation?.url}/checkouts/${item?.id}/event${partner ? `?partner=${partner}` : ''}`
  }`;

  const linkHrefView = `/events/${item?.event?.slug}`;

  return (
    <>
      <div
        key={index}
        className="mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white px-2 hover:-translate-y-1 dark:border-gray-800 dark:bg-[#04080b]"
      >
        <div className="cursor-pointer divide-y divide-gray-200 dark:divide-gray-800">
          <div className="py-1">
            <div className="flex items-center">
              {item?.oneUploadsImage ? (
                <Link href={linkHrefCheckouts} className="relative shrink-0">
                  <SwiperImage
                    height="90px"
                    width="90px"
                    src={`${viewOneFileUploadAPI({
                      folder: String(
                        item?.oneUploadsImage?.model.toLocaleLowerCase(),
                      ),
                      fileName: String(item?.oneUploadsImage?.path),
                    })}`}
                    alt={String(item?.event?.title)}
                  />
                </Link>
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
                          {formateToCccc(item?.expiredAt as Date, locale)}
                        </p>
                        <p className="mt-1 font-semibold">
                          {capitalizeFirstLetter(
                            formateToLLLL(item?.expiredAt as Date, locale),
                          )}
                          <span className="ml-1.5">
                            {viewYyformateToYyyy(item?.expiredAt as Date)}
                          </span>
                        </p>
                        <p className="mt-1 font-semibold">
                          <span>{item?.timeInit}</span>
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
                <div className="mt-1.5 hidden sm:block">
                  <Link href={linkHrefCheckouts}>
                    <ButtonInput
                      type="button"
                      variant="primary"
                      size="sm"
                      icon={<TicketIcon className="size-6" />}
                    >
                      Ticket
                    </ButtonInput>
                  </Link>

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

            <div className="mt-1 flex items-center">
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
                  'Free'
                )}
              </div>
            </div>
            <div className="mt-1.5 sm:hidden">
              <Link href={linkHrefCheckouts}>
                <ButtonInput
                  type="button"
                  variant="primary"
                  className="w-full"
                  size="sm"
                  icon={<TicketIcon className="size-6" />}
                >
                  Ticket
                </ButtonInput>
              </Link>
            </div>
          </div>

          {/**** Copy and delete *****/}
          <CopyShareLink
            isOpen={copied}
            setIsOpen={setCopied}
            link={`${process.env.NEXT_PUBLIC_SITE}/checkouts/${item?.id}/event`}
          />
        </div>
      </div>
    </>
  );
};

export { ListPublicEventDates };
