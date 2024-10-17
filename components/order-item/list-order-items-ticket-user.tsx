/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { OrderItemModel } from '@/types/order-item';
import {
  formateddLLLyyyyHHmm,
  formateToCccc,
  formateTodd,
  formateToLLLL,
  viewYyformateToYyyy,
} from '@/utils';
import { ReadMore } from '@/utils/read-more';
import {
  capitalizeFirstLetter,
  obfuscateEmail,
  truncateInput,
} from '@/utils/utils';
import {
  BadgeAlertIcon,
  CircleCheckBigIcon,
  MailIcon,
  PencilIcon,
  ShareIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { CopyShareLink, SerialPrice } from '../ui-setting';
import { UpdateOrderItemsModal } from './update-order-items-modal';

type Props = {
  item: OrderItemModel;
  index: number;
};

const ListOrderItemsTicketUser = ({ item, index }: Props) => {
  const { push } = useRouter();
  const [level, setLevel] = useState<string | number>('L');
  const [copied, setCopied] = useState(false);
  const { ipLocation, t, locale, isOpen, setIsOpen } = useInputState();
  const arrayItem = [
    {
      models: ['TICKET', 'BOOKING'],
      title: item?.event?.title,
      url: `/tickets/${item?.orderNumber}/validate`,
    },
  ];
  const oneItem = (model: string) =>
    arrayItem.find((item) => item?.models.includes(model));

  return (
    <>
      <tr key={index} className="table-row">
        <td className="py-2 text-sm font-bold table-cell">
          <Link href={`${oneItem(item?.model)?.url}`}>
            <div className="flex min-w-0 flex-1 items-center">
              <div
                className={`${item?.confirmedAt ? 'text-success hover:text-green-900' : `${item?.eventDate?.isExpired ? `text-danger hover:text-rose-900` : `text-gray-600 hover:text-gray-800`}`}`}
              >
                {/* <Badge className="rounded-sm" variant="danger">
                  <BookmarkPlusIcon className="size-4" /> Booking
                </Badge> */}

                {!item?.eventDate?.isExpired &&
                formateTodd(item?.eventDate?.startedAt, locale) ===
                  String(new Date().getDate()) ? (
                  <div className="flex justify-center">
                    <span className="relative flex size-4">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex size-4 rounded-full bg-green-500"></span>
                    </span>
                  </div>
                ) : null}

                <p className="mt-1 text-5xl">
                  {formateTodd(item?.eventDate?.startedAt as Date, locale)}
                </p>
                <p className="mt-1 text-center">
                  {capitalizeFirstLetter(
                    formateToCccc(item?.eventDate?.startedAt as Date, locale),
                  )}
                </p>
              </div>

              <div className="ml-2 min-w-0 flex-1 cursor-pointer">
                <div className={`flex items-center font-bold`}>
                  <p
                    className={`text-sm ${item?.confirmedAt ? 'text-success hover:text-green-900' : `${item?.eventDate?.isExpired ? `text-danger hover:text-rose-900` : `text-gray-600 hover:text-gray-800`}`}`}
                  >
                    {capitalizeFirstLetter(
                      formateToLLLL(item?.eventDate?.startedAt as Date, locale),
                    )}
                    <span className="ml-1">
                      {viewYyformateToYyyy(item?.eventDate?.startedAt as Date)}
                    </span>
                  </p>
                </div>

                <div className="mt-2">
                  <Badge className="rounded-sm" variant="secondary">
                    {capitalizeFirstLetter(item?.ticket?.name ?? 'FREE')}
                  </Badge>
                </div>

                {item?.fullName ? (
                  <div className="lg:hidden mt-1 flex items-center font-bold text-gray-600">
                    <UserIcon className="size-4" />
                    <span className="ml-1">
                      {truncateInput(item?.fullName, 16)}
                    </span>
                  </div>
                ) : null}

                {item?.email ? (
                  <div className="lg:hidden mt-1 flex items-center font-bold text-gray-600">
                    <MailIcon className="size-4" />
                    <span className="ml-1">{obfuscateEmail(item?.email)}</span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-1 text-sm font-bold transition-all duration-200 hover:text-blue-600">
              <ReadMore html={item?.event?.title} value={100} />
            </div>
          </Link>
        </td>

        <td className="hidden text-center text-sm font-bold items-center text-gray-600 lg:table-cell">
          {item?.fullName ? (
            <div className="mt-1 flex">
              <span className="ml-1">{item?.fullName}</span>
            </div>
          ) : null}

          {item?.email ? (
            <div className="mt-1 flex">
              <span className="ml-1">{item?.email}</span>
            </div>
          ) : null}
        </td>

        <td className="hidden space-x-1 text-right text-sm font-bold dark:text-white lg:table-cell">
          {!['DELIVERED', 'CONFIRMED'].includes(item?.status) &&
          item?.eventDate?.isExpired ? (
            <BadgeAlertIcon className="text-danger" />
          ) : (
            ['ACCEPTED'].includes(item?.status) && (
              <CircleCheckBigIcon className="text-gray-600" />
            )
          )}

          {['DELIVERED', 'CONFIRMED'].includes(item?.status) && (
            <CircleCheckBigIcon className="text-green-600" />
          )}
        </td>

        <td className="hidden text-right text-sm font-bold dark:text-white lg:table-cell">
          {Number(item?.priceTotal) > 0 ? (
            <SerialPrice
              className="text-sm"
              value={Number(item?.priceTotal)}
              currency={{ code: String(item?.currency) }}
            />
          ) : (
            t.formatMessage({ id: 'UTIL.FREE' })
          )}
        </td>

        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {formateddLLLyyyyHHmm(item?.createdAt as Date, locale)}
        </td>

        <td className="py-4 text-right text-sm font-medium">
          <TooltipProvider>
            <Tooltip>
              {!['DELIVERED', 'CONFIRMED'].includes(item?.status) &&
              item?.eventDate?.isExpired ? (
                <>
                  <TooltipTrigger className="lg:hidden">
                    <BadgeAlertIcon className="ml-auto text-danger size-5" />
                  </TooltipTrigger>
                  <TooltipContent>Event expired</TooltipContent>
                </>
              ) : (
                ['ACCEPTED'].includes(item?.status) && (
                  <>
                    <TooltipTrigger className="lg:hidden">
                      <CircleCheckBigIcon className="ml-auto text-gray-600 size-5" />
                    </TooltipTrigger>
                    <TooltipContent>Event accepted</TooltipContent>
                  </>
                )
              )}

              {['DELIVERED', 'CONFIRMED'].includes(item?.status) && (
                <>
                  <TooltipTrigger className="lg:hidden">
                    <CircleCheckBigIcon className="ml-auto text-green-600 size-5" />
                  </TooltipTrigger>
                  <TooltipContent>Event confirmed</TooltipContent>
                </>
              )}
            </Tooltip>
          </TooltipProvider>

          {!item?.confirmedAt && !item?.eventDate?.isExpired ? (
            <div className="mt-2 flex justify-end font-medium space-x-3">
              <PencilIcon
                onClick={() => setIsOpen(true)}
                className="text-gray-600 hover:text-blue-600 cursor-pointer size-5"
              />

              <ShareIcon
                onClick={() => setCopied(true)}
                className="text-gray-600 hover:text-blue-600 cursor-pointer size-5"
              />
            </div>
          ) : null}

          <div className="mt-2 text-sm font-bold lg:hidden">
            {Number(item?.priceTotal) > 0 ? (
              <SerialPrice
                className="text-sm"
                value={Number(item?.priceTotal)}
                currency={{ code: String(item?.currency) }}
              />
            ) : (
              t.formatMessage({ id: 'UTIL.FREE' })
            )}
          </div>

          <div className="mt-1 text-right text-sm font-medium text-gray-600 lg:hidden">
            {formateddLLLyyyyHHmm(item?.createdAt as Date, locale)}
          </div>
        </td>
      </tr>

      <CopyShareLink
        isOpen={copied}
        setIsOpen={setCopied}
        link={`${ipLocation?.url}/tickets/${item?.orderNumber}/validate-public`}
      />

      {isOpen ? (
        <UpdateOrderItemsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          orderItem={item}
        />
      ) : null}
    </>
  );
};

export { ListOrderItemsTicketUser };
