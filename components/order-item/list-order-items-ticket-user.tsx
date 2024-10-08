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
  formateFromNow,
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
      <tr key={index}>
        <td className="py-2 text-sm font-bold">
          <Link
            prefetch={true}
            href={`${oneItem(item?.model)?.url}`}
            title={oneItem(item?.model)?.title}
          >
            <div className="flex min-w-0 flex-1 items-center">
              <div
                className={`${item?.confirmedAt ? 'text-success hover:text-green-700' : `${item?.eventDate?.isExpired ? `text-danger` : `text-gray-600 hover:text-gray-800`}`}`}
              >
                {/* <Badge className="rounded-sm" variant="danger">
                  <BookmarkPlusIcon className="size-4" /> Booking
                </Badge> */}
                <p className="mt-1 text-5xl">
                  {formateTodd(item?.eventDate?.expiredAt as Date, locale)}
                </p>
                <p className="mt-1 text-center">
                  {capitalizeFirstLetter(
                    formateToCccc(item?.eventDate?.expiredAt as Date, locale),
                  )}
                </p>
              </div>

              <div className="ml-2 min-w-0 flex-1 cursor-pointer">
                <div className={`flex items-center font-bold`}>
                  <p
                    className={`text-sm ${item?.confirmedAt ? 'text-success hover:text-green-700' : `${item?.eventDate?.isExpired ? `text-danger` : `text-gray-600`}`}`}
                  >
                    {capitalizeFirstLetter(
                      formateToLLLL(item?.eventDate?.expiredAt as Date, locale),
                    )}
                    <span className="ml-1">
                      {viewYyformateToYyyy(item?.eventDate?.expiredAt as Date)}
                    </span>
                  </p>
                </div>

                <div className="mt-2">
                  <Badge className="rounded-sm" variant="secondary">
                    {capitalizeFirstLetter(item?.ticket?.name ?? 'FREE')}
                  </Badge>
                </div>

                {item?.fullName ? (
                  <div className="mt-1 flex items-center font-bold text-gray-600">
                    <UserIcon className="size-4" />
                    <span className="ml-1 sm:hidden">
                      {truncateInput(item?.fullName, 16)}
                    </span>
                    <span className="ml-1 hidden sm:table-cell">
                      {item?.fullName}
                    </span>
                  </div>
                ) : null}

                {item?.email ? (
                  <div className="mt-1 flex items-center font-bold text-gray-600">
                    <MailIcon className="size-4" />
                    <span className="ml-1 sm:hidden">
                      {obfuscateEmail(item?.email)}
                    </span>
                    <span className="ml-1 hidden sm:table-cell">
                      {item?.email}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-1 text-sm font-bold transition-all duration-200 hover:text-blue-600">
              <ReadMore html={item?.event?.title} value={100} />
            </div>
          </Link>
        </td>

        <td className="hidden space-x-1 text-right text-sm font-bold dark:text-white lg:table-cell">
          {!['DELIVERED', 'CONFIRMED'].includes(item?.status) &&
          item?.eventDate?.isExpired ? (
            <BadgeAlertIcon className="text-red-600" />
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
            'Free'
          )}
        </td>

        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {formateFromNow(item?.createdAt as Date, locale)}
        </td>

        <td className="py-4 text-right text-sm font-medium">
          <TooltipProvider>
            <Tooltip>
              {!['DELIVERED', 'CONFIRMED'].includes(item?.status) &&
              item?.eventDate?.isExpired ? (
                <>
                  <TooltipTrigger className="lg:hidden">
                    <BadgeAlertIcon className="ml-auto text-red-600 size-5" />
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

          <div className="py-4 flex justify-end font-medium space-x-3">
            {!item?.confirmedAt && !item?.eventDate?.isExpired ? (
              <PencilIcon
                onClick={() => setIsOpen(true)}
                className="text-gray-600 hover:text-blue-600 cursor-pointer size-5"
              />
            ) : null}

            <ShareIcon
              onClick={() => setCopied(true)}
              className="text-gray-600 hover:text-blue-600 cursor-pointer size-5"
            />
          </div>

          <div className="text-sm font-bold lg:hidden">
            {Number(item?.priceTotal) > 0 ? (
              <SerialPrice
                className="text-sm"
                value={Number(item?.priceTotal)}
                currency={{ code: String(item?.currency) }}
              />
            ) : (
              'Free'
            )}
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
