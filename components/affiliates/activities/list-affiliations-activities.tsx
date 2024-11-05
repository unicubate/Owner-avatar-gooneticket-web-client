/* eslint-disable jsx-a11y/anchor-is-valid */
import { AffiliationActivityModel } from '@/types/affiliation';
import { formateFromNow } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { CalendarPlus2 } from 'lucide-react';
import { useInputState } from '../../hooks';
import { SerialPrice } from '../../ui-setting/serial-price';

type Props = {
  item?: AffiliationActivityModel;
  index: number;
};

export const ListAffiliationsTransactions = ({ item, index }: Props) => {
  const { locale } = useInputState();
  return (
    <>
      <tr key={index}>
        <td className="py-4 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="min-w-0 flex-1 text-sm">
              <div className="flex items-center text-gray-600 lg:hidden">
                <span className="font-bold">
                  <CalendarPlus2 className="size-4" />
                </span>
                <span className="ml-1.5 text-sm font-normal">
                  {formateFromNow(item?.createdAt as Date, locale)}
                </span>
              </div>

              <p className="mt-1 font-base">
                <ReadMore html={`${item?.event?.title ?? ''}`} value={60} />
              </p>
            </div>
          </div>
        </td>

        <td
          className={`hidden text-right text-sm font-bold ${item?.transaction?.status === 'IN' ? 'text-green-600' : ''} lg:table-cell`}
        >
          {Number(item?.amount) > 0 ? (
            <>
              {item?.transaction?.status === 'IN' ? '+' : '-'}
              <SerialPrice
                className="text-sm"
                value={Number(item?.amount)}
                currency={{ code: String(item?.transaction?.currency) }}
              />
            </>
          ) : (
            'Free'
          )}
        </td>

        {/* <td className="hidden text-right text-sm font-bold text-gray-600 lg:table-cell">
         
        </td> */}

        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {formateFromNow(item?.createdAt as Date, locale)}
        </td>

        <td className="py-4 text-right text-sm font-medium">
          <p className="text-sm font-bold lg:hidden">
            <span
              className={`${item?.transaction?.status === 'IN' ? 'text-green-600' : ''}`}
            >
              {Number(item?.amount) > 0 ? (
                <SerialPrice
                  className="text-sm"
                  value={Number(item?.amount)}
                  currency={{ code: String(item?.transaction?.currency) }}
                />
              ) : (
                'Free'
              )}
            </span>
          </p>
        </td>
      </tr>
    </>
  );
};
