import { GetStatisticsTransactionsAPI } from '@/api-site/transaction';
import { HorizontalNavDonation } from '@/components/donation/horizontal-nav-donation';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { TableTransactions } from '@/components/transaction/table-transactions';
import { SerialPrice } from '@/components/ui-setting/serial-price';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { useDebounce } from '@/utils';
import { GetStaticPropsContext } from 'next';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Donations = () => {
  const user = useAuth() as any;
  const [days, setDays] = useState(-1);
  const [openDrop, setOpenDrop] = useState(false);

  const debouncedFilter = useDebounce(days, 100);
  const isEnabled = Boolean(debouncedFilter);
  const {
    data: transactions,
    isError,
    isPending,
    error,
  } = GetStatisticsTransactionsAPI({
    queryKey: ['statistics-transactions'],
    days: debouncedFilter,
    isEnabled: isEnabled,
  });

  const handleDaysChange = (newDays: number) => {
    setDays(newDays);
  };

  if (isPending) {
    return '';
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const transaction = transactions?.find((item) => item?.model === 'DONATION');

  return (
    <>
      <LayoutDashboard title={'Donations'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <HorizontalNavDonation />

            <div className="flow-root">
              <div className="mt-4 flex items-center">
                <div className="ml-auto">
                  <div className="flex items-center space-x-4">
                    <div className="mx-auto max-w-xs">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button type="button" size="sm" variant="outline">
                            {days > 0 ? `Last ${days} days` : 'All time'}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-10 dark:border-gray-800 dark:bg-[#1c1b22]">
                          {' '}
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => {
                                handleDaysChange(-1), setOpenDrop(false);
                              }}
                            >
                              <span className="cursor-pointer">All time</span>
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
                                Last 30 days
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
                              {' '}
                              Last 120 days
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-1 sm:gap-6 lg:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Donator
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {transaction?.statistic?.count ?? 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {days > 0 ? `Last ${days} days` : 'All time'}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        <SerialPrice
                          className="text-xl font-bold text-gray-900 dark:text-white"
                          value={Number(transaction?.statistic?.amount)}
                          currency={{
                            code: user?.profile?.currency?.code,
                            amount: String(user?.profile?.currency?.amount),
                          }}
                        />
                      </p>
                    </div>
                  </div>
                </div>

                {user?.organizationId ? (
                  <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                    <div className="px-5 py-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        All-time
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          <SerialPrice
                            className="text-xl font-bold text-gray-900 dark:text-white"
                            value={Number(user?.donation?.amount)}
                            currency={{
                              code: user?.profile?.currency?.code,
                              amount: String(user?.profile?.currency?.amount),
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {user?.organizationId ? (
                <TableTransactions
                  model="DONATION"
                  days={debouncedFilter}
                  organizationId={user?.organizationId}
                />
              ) : null}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Donations);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../lang/${locale}/index.json`)).default,
    },
  };
}
