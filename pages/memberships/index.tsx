import { PrivateComponent } from '@/components/util/private-component';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { Button } from 'antd';
import { HorizontalNavMembership } from '@/components/membership/horizontal-nav-membership';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/util/context-user';
import { SerialPrice } from '@/components/ui-setting/serial-price';
import { GetStatisticsTransactionsAPI } from '@/api-site/transaction';
import { useState } from 'react';
import { TableTransactions } from '@/components/transaction/table-transactions';
import { GetStaticPropsContext } from 'next';
import { ButtonInput } from '@/components/ui-setting';

const Memberships = () => {
  const user = useAuth() as any;
  const [dayCount, setDayCount] = useState(30);
  const router = useRouter();

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

  const transaction = transactions?.find((item) => item.model === 'MEMBERSHIP');

  return (
    <>
      <LayoutDashboard title={'Memberships'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <HorizontalNavMembership />

            <div className="flow-root">
              <div className="mt-4 flex items-center">
                <div className="ml-auto">
                  <div className="flex items-center space-x-4">
                    <ButtonInput
                      type="button"
                      size="sm"
                      variant="outline"
                    >
                      Last {dayCount} days
                    </ButtonInput>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-1 sm:gap-6 lg:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Supporter
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
                            value={Number(user?.membership?.amount)}
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
                  model="MEMBERSHIP"
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

export default PrivateComponent(Memberships);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
