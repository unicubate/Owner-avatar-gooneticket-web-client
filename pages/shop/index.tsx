import { GetStatisticsTransactionsAPI } from '@/api-site/transaction';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { HorizontalNavShop } from '@/components/shop/horizontal-nav-shop';
import { TableTransactions } from '@/components/transaction/table-transactions';
import { ButtonInput } from '@/components/ui-setting';
import { SerialPrice } from '@/components/ui-setting/serial-price';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';
import { useState } from 'react';

const ShopsIndex = () => {
  const user = useAuth() as any;
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
    queryKey: ['statistics-transactions'],
    days: dayCount,
  });

  if (isPending) {
    return '';
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const transaction = transactions?.find(
    (item: any) => item.model === 'PRODUCT',
  );

  return (
    <>
      <LayoutDashboard title={'Shop'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <HorizontalNavShop />

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
                        Last {dayCount} days
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
                      Last {dayCount} days
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

              {user?.organizationId ? (
                <TableTransactions
                  model="PRODUCT"
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

export default PrivateComponent(ShopsIndex);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
