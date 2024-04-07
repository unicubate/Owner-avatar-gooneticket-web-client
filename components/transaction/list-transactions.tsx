/* eslint-disable jsx-a11y/anchor-is-valid */
import { TransactionModel } from '@/types/transaction';
import { formateFromNow } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { MoreHorizontalIcon } from 'lucide-react';
import { useInputState } from '../hooks';
import { AvatarComponent } from '../ui-setting/ant';
import { SerialPrice } from '../ui-setting/serial-price';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type Props = {
  item?: TransactionModel;
  index: number;
};

export const ListTransactions = ({ item, index }: Props) => {
  const { lang } = useInputState();
  return (
    <>
      <tr key={index}>
        <td className="py-4 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            <AvatarComponent
              size={40}
              profile={
                item?.profileSend?.id
                  ? item?.profileSend
                  : { firstName: item?.fullName }
              }
            />

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {item?.profileSend?.id
                  ? `${item?.profileSend?.firstName} ${item?.profileSend?.lastName}`
                  : item?.fullName}
              </p>
              <p className="mt-1 hidden text-sm font-medium  text-gray-600 sm:table-cell">
                {item?.profileSend?.email}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 sm:hidden">
                <ReadMore html={`${item?.profileSend?.email}`} value={18} />
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 lg:hidden">
                {formateFromNow(String(item?.createdAt), lang)}
              </p>
            </div>
          </div>
        </td>

        <td className="hidden text-left text-sm font-medium dark:text-white lg:table-cell">
          {item?.model.toLocaleLowerCase()}
        </td>

        <td className="hidden text-right text-sm font-bold dark:text-white lg:table-cell">
          <SerialPrice
            className="text-sm"
            value={Number(item?.amount)}
            currency={{ code: String(item?.currency) }}
          />
        </td>

        {/* <td className="hidden text-sm text-right font-medium text-gray-900 lg:table-cell">
          <ReadMore html={`${item?.description ?? ""}`} value={20} />
        </td> */}

        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {formateFromNow(String(item?.createdAt), lang)}
        </td>

        <td className="py-4 text-right text-sm font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" size="icon" variant="ghost">
                <MoreHorizontalIcon className="size-5 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#1c1b22]">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span className="cursor-pointer">View info</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                          <span className="cursor-pointer">Invite</span>
                        </DropdownMenuItem> */}
              </DropdownMenuGroup>
              {/* <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="cursor-pointer">Envoice</span>
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="mt-1 pt-1 lg:hidden">
            <p className="inline-flex text-sm font-bold dark:text-white">
              <SerialPrice
                className="text-sm"
                value={Number(item?.amount)}
                currency={{ code: String(item?.currency) }}
              />
            </p>

            {/* <div className="inline-flex items-center justify-end mt-1">
                                      07 January, 2022
                                    </div> */}
          </div>
        </td>
      </tr>
    </>
  );
};
