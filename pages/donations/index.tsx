import { GetStatisticsTransactionsAPI } from '@/api-site/transaction';
import { HorizontalNavDonation } from '@/components/donation/horizontal-nav-donation';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { TableTransactions } from '@/components/transaction/table-transactions';
import { ButtonInput } from '@/components/ui-setting';
import { SerialPrice } from '@/components/ui-setting/serial-price';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { useDebounce } from '@/utils';
import { GetStaticPropsContext } from 'next';
import { useState } from 'react';

const Donations = () => {
  const user = useAuth() as any;
  const [days, setDays] = useState(30);
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

  // useEffect(() => {
  //   handleDaysChange(days);
  // }, [days, debouncedFilter]);

  if (isPending) {
    return '';
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const transaction = transactions?.find((item) => item.model === 'DONATION');

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
                      <ButtonInput
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setOpenDrop((lk) => !lk)}
                      >
                        Last {days} days
                      </ButtonInput>

                      {openDrop && (
                        <div className="relative z-10 mt-2 w-full">
                          <div className="block w-full space-y-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow dark:border-gray-800 dark:bg-[#121212]">
                            <ul className="flex flex-col">
                              <li
                                onClick={() => {
                                  handleDaysChange(2), setOpenDrop(false);
                                }}
                                className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                Last 2 days
                              </li>
                              <li
                                onClick={() => {
                                  handleDaysChange(120), setOpenDrop(false);
                                }}
                                className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                Last 120 days
                              </li>
                              <li className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                All time
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
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
                      Last {days} days
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
