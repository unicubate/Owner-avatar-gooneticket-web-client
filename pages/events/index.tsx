import { GetStatisticsTransactionsAPI } from '@/api-site/transaction';
import { HorizontalNavEvent } from '@/components/event/horizontal-nav-event';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { TableTransactions } from '@/components/transaction/table-transactions';
import { ButtonInput } from '@/components/ui-setting';
import { SerialPrice } from '@/components/ui-setting/serial-price';
import { PrivateComponent } from '@/components/util/private-component';
import { useState } from 'react';

const EventsIndex = () => {
  const { t, userStorage: user } = useInputState();
  const [dayCount, setDayCount] = useState(30);
  const [openDrop, setOpenDrop] = useState(false);
  // const handleDaysChange = (newDays: number) => {
  //   setDayCount(newDays);
  // };

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
    return <span>Error: {error.message}</span>;
  }

  const transaction = transactions?.find(
    (item: any) => item.model === 'EVENT',
  );

  return (
    <>
      <LayoutDashboard title={'Events'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <HorizontalNavEvent />

            <div className="flow-root">
              <div className="mt-4 flex items-center">
                <div className="ml-auto">
                  <div className="flex items-center space-x-4">
                    <div className="mx-auto max-w-xs">
                      <ButtonInput
                        type="button"
                        className="w-full"
                        size="sm"
                        variant="outline"
                        onClick={() => setOpenDrop((lk) => !lk)}
                      >
                        {t.formatMessage({ id: 'TRANSACTION.LAST_DAY' }, { day: dayCount })}
                      </ButtonInput>

                      {/* {openDrop && (
                        <div className="relative mt-2 w-full z-10">
                          <div className="border-gray-300 dark:border-gray-800 bg-white dark:bg-[#121212] shadow border rounded-lg w-full block text-sm px-4 py-2 space-y-2">

                            <ul className="flex flex-col">
                              <li onClick={() => { handleDaysChange(30), setOpenDrop(false) }} className="w-full rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" >Last 30 days</li>
                              <li onClick={() => { handleDaysChange(120), setOpenDrop(false) }} className="w-full rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Last 120 days</li>
                              <li className="w-full rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">All time</li>
                            </ul>

                          </div>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-1 sm:gap-6 lg:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Orders
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
                      {t.formatMessage({ id: 'TRANSACTION.LAST_DAY' }, { day: dayCount })}
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
                        {t.formatMessage({ id: 'TRANSACTION.ALL_TIME' })}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          <SerialPrice
                            className="text-xl font-bold text-gray-900 dark:text-white"
                            value={Number(user?.product?.amount)}
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

              <TableTransactions
                model="EVENT"
                organizationId={user?.organizationId}
              />
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(EventsIndex);
