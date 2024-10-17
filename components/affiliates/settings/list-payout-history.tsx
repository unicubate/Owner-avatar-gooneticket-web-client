/* eslint-disable jsx-a11y/anchor-is-valid */
import { formateFromNow } from '@/utils';
import {
  BadgeAlertIcon,
  CalendarIcon,
  CircleCheckBigIcon,
  LandmarkIcon,
  LoaderIcon,
} from 'lucide-react';
import { useRouter } from 'next/router';

import { useInputState } from '@/components/hooks';
import { SerialPrice } from '@/components/ui-setting';
import { Badge } from '@/components/ui/badge';
import { WithdrawalsModel } from '@/types/payment';
import { capitalizeFirstLetter, maskIBAN } from '@/utils/utils';

type Props = {
  item?: WithdrawalsModel;
  index: number;
};

export const ListPayoutHistory = ({ item, index }: Props) => {
  const { locale } = useInputState();
  const { push } = useRouter();
  return (
    <>
      <tr key={index}>
        <td className="py-4 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center text-gray-600">
            <CalendarIcon className="size-4" />
            <span className="ml-2 font-bold">
              {formateFromNow(item?.createdAt as Date, locale)}
            </span>
          </div>
          <div className="mt-2 flex min-w-0 items-center">
            <LandmarkIcon className="size-4" />
            <span className="ml-2 font-bold">
              {maskIBAN(item?.payment?.iban ?? '')}
            </span>
          </div>
        </td>

        <td className={`hidden text-sm text-right font-bold lg:table-cell`}>
          <SerialPrice
            value={Number(item?.amount)}
            currency={{ code: String(item?.currency) }}
          />
        </td>

        <td className="py-4 text-right font-medium">
          <div className="mt-1 pt-1 text-sm lg:hidden">
            <p className={`inline-flex font-bold`}>
              <SerialPrice
                value={Number(item?.amount)}
                currency={{ code: String(item?.currency) }}
              />
            </p>
          </div>

          {item?.status === 'CONFIRMED' && (
            <Badge className="mt-1 h-6 gap-1 rounded-sm" variant="success">
              <CircleCheckBigIcon className="size-4" />
              <span>{capitalizeFirstLetter(item?.status)}</span>
            </Badge>
          )}

          {item?.status === 'PENDING' && (
            <Badge
              className="mt-1 h-6 gap-1 rounded-sm text-sm"
              variant="outline"
            >
              <LoaderIcon className="size-4 animate-spin" />
              <span>{capitalizeFirstLetter(item?.status)}</span>
            </Badge>
          )}

          {item?.status === 'INVALID' && (
            <Badge
              className="mt-1 h-6 gap-1 rounded-sm text-sm"
              variant="danger"
            >
              <BadgeAlertIcon className="size-4" />
              <span>{capitalizeFirstLetter(item?.status)}</span>
            </Badge>
          )}
        </td>
      </tr>
    </>
  );
};
