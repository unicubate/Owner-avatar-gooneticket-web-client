import { GetStatisticsTransactionsAPI } from '@/api-site/transaction';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { RecentTransactions } from '@/components/transaction/recent-transactions';
import { AvatarComponent } from '@/components/ui-setting/ant/avatar-component';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { SerialPrice } from '@/components/ui-setting/serial-price';
import { useAuth } from '@/components/util/context-user';
import Link from 'next/link';
import { useState } from 'react';

import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PrivateComponent } from '@/components/util/private-component';
import { capitalizeFirstLetter } from '@/utils/utils';
import {
  LockKeyholeIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  StoreIcon,
} from 'lucide-react';
import { useIntl } from 'react-intl';

const Dashboard = () => {
  const t = useIntl();
  const [openDrop, setOpenDrop] = useState(false);
  const [dayCount, setDayCount] = useState(-1);
  const user = useAuth() as any;

  const {
    data: transactions,
    isError,
    isPending,
    error,
  } = GetStatisticsTransactionsAPI({
    days: dayCount,
  });

  if (isPending) {
    return '';
  }

  if (isError) {
    return (
      <ErrorFile
        title="404"
        description="Error find data please try again..."
      />
    );
  }

  const transactionEvent = transactions?.find(
    (item) => item.model === 'EVENT',
  );
  const transactionProduct = transactions?.find(
    (item) => item.model === 'PRODUCT',
  );

  const handleDaysChange = (newDays: number) => {
    setDayCount(newDays);
  };

  return (
    <>
      <LayoutDashboard title={'Dashboard'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-[#121212]">
                <div className="flex items-center">
                  <div className="relative shrink-0 cursor-pointer">
                    <AvatarComponent size={60} profile={user?.profile} />
                  </div>

                  <div className="ml-4 cursor-pointer">
                    <p className="text-xl font-bold dark:text-white">
                      {capitalizeFirstLetter(user?.profile?.firstName ?? '')}{' '}
                      {capitalizeFirstLetter(user?.profile?.lastName ?? '')}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {process.env.NEXT_PUBLIC_SITE}/{user?.username ?? ''}
                    </p>
                  </div>

                  <div className="ml-auto">
                    <ButtonInput type="button" variant="default">
                      {t.formatMessage({ id: 'TRANSACTION.WITHDRAW' })}
                    </ButtonInput>
                  </div>
                </div>

                <div className="mt-3 flex items-center text-gray-900 dark:text-white">

                  <Link href="/settings/followers">
                    <span className="text-lg font-bold">
                      {user?.totalFollower ?? 0}
                    </span>
                    <span className="ml-2 text-sm font-normal">
                      {t.formatMessage({ id: 'MENU.FOLLOWER' })}
                    </span>
                  </Link>

                  <Link href="/settings/followings">
                    <span className="ml-4 text-lg font-bold">
                      {user?.totalFollowing ?? 0}
                    </span>
                    <span className="ml-2 text-sm font-normal">
                      {t.formatMessage({ id: 'MENU.FOLLOWING' })}
                    </span>
                  </Link>

                </div>

                <div className="mt-3 flex items-center text-gray-900 dark:text-white">
                  <SerialPrice
                    className="text-3xl font-bold"
                    value={Number(user?.wallet?.amount)}
                    currency={{
                      code: user?.profile?.currency?.code,
                      amount: String(user?.profile?.currency?.amount),
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center">
                <div className="ml-auto">
                  <div className="flex items-center space-x-4">
                    {/* <Button shape="default" size="large" loading={false}>
                          <span className="font-bold text-gray-900">
                            Last {dayCount} days
                          </span>
                        </Button> */}
                    {/* <ButtonInput type="button" size="sm" variant="outline">
                      {t('last_time_days', { day: dayCount })}
                    </ButtonInput> */}

                    {/* <div className="mx-auto max-w-xs"> */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button" size="sm" variant="outline">
                          {dayCount > 0
                            ? `${t.formatMessage({ id: 'TRANSACTION.LAST_DAY' }, { day: dayCount })}`
                            : `${t.formatMessage({ id: 'TRANSACTION.ALL_TIME' })}`}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-20 dark:border-gray-800 dark:bg-[#1c1b22]">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => {
                              handleDaysChange(-1), setOpenDrop(false);
                            }}
                          >
                            <span className="cursor-pointer">
                              {t.formatMessage({ id: 'TRANSACTION.ALL_TIME' })}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => {
                              handleDaysChange(30), setOpenDrop(false);
                            }}
                          >
                            <span className="cursor-pointer">
                              {t.formatMessage(
                                { id: 'TRANSACTION.LAST_DAY' },
                                { day: 30 },
                              )}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            handleDaysChange(120), setOpenDrop(false);
                          }}
                        >
                          <span className="cursor-pointer">
                            {t.formatMessage(
                              { id: 'TRANSACTION.LAST_DAY' },
                              { day: 120 },
                            )}
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* </div> */}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-1 sm:gap-6 lg:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {t.formatMessage({ id: 'MENU.EVENT' })}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <SerialPrice
                        className="text-xl font-bold text-gray-900 dark:text-white"
                        value={Number(transactionEvent?.statistic?.amount)}
                        currency={{
                          code: user?.profile?.currency?.code,
                          amount: String(user?.profile?.currency?.amount),
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {t.formatMessage({ id: 'MENU.SHOP' })}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <SerialPrice
                        className="text-xl font-bold text-gray-900 dark:text-white"
                        value={Number(transactionProduct?.statistic?.amount)}
                        currency={{
                          code: user?.profile?.currency?.code,
                          amount: String(user?.profile?.currency?.amount),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {user?.id ? <RecentTransactions days={dayCount} /> : null}

              <div className="mt-4 rounded-lg bg-white py-4 dark:bg-[#121212] sm:py-4 lg:py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-12 xl:max-w-none xl:grid-cols-4">
                    <div className="flex items-center">
                      <ShieldCheckIcon className="size-14 shrink-0 text-gray-700 dark:text-white" />
                      <div className="ml-4">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          {t.formatMessage({ id: 'DASHBOARD.FEATURE.1.TITLE' })}
                        </h3>
                        <p className="mt-1 text-sm font-normal text-gray-600 dark:text-white">
                          {t.formatMessage({
                            id: 'DASHBOARD.FEATURE.1.DESCRIPTION',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <ShoppingBagIcon className="size-14 shrink-0 text-gray-700 dark:text-white" />
                      <div className="ml-4">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          {t.formatMessage({ id: 'DASHBOARD.FEATURE.2.TITLE' })}
                        </h3>
                        <p className="mt-1 text-sm font-normal text-gray-600 dark:text-white">
                          {t.formatMessage({
                            id: 'DASHBOARD.FEATURE.2.DESCRIPTION',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <LockKeyholeIcon className="size-14 shrink-0 text-gray-700 dark:text-white" />
                      <div className="ml-4">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          {t.formatMessage({ id: 'DASHBOARD.FEATURE.3.TITLE' })}
                        </h3>
                        <p className="mt-1 text-sm font-normal text-gray-600 dark:text-white">
                          {t.formatMessage({
                            id: 'DASHBOARD.FEATURE.3.DESCRIPTION',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <StoreIcon className="size-14 shrink-0 text-gray-700 dark:text-white" />
                      <div className="ml-4">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          {t.formatMessage({ id: 'DASHBOARD.FEATURE.4.TITLE' })}
                        </h3>
                        <p className="mt-1 text-sm font-normal text-gray-600 dark:text-white">
                          {t.formatMessage({
                            id: 'DASHBOARD.FEATURE.4.DESCRIPTION',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

//export default Dashboard;
export default PrivateComponent(Dashboard);
