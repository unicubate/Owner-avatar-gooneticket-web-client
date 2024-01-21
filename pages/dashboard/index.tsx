import { PrivateComponent } from '@/components/util/private-component';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { useState } from 'react';
import { CiGift, CiShop, CiUnlock, CiWallet } from 'react-icons/ci';
import Link from 'next/link';
import { useAuth } from '@/components/util/context-user';
import { RecentTransactions } from '@/components/transaction/recent-transactions';
import { AvatarComponent } from '@/components/ui-setting/ant/avatar-component';
import { SerialPrice } from '@/components/ui-setting/serial-price';
import { GetStatisticsTransactionsAPI } from '@/api-site/transaction';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

const Dashboard = () => {
  const t = useTranslations();
  const [dayCount, setDayCount] = useState(30);
  const user = useAuth() as any;

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

  const transactionDonation = transactions?.find(
    (item) => item.model === 'DONATION',
  );
  const transactionMembership = transactions?.find(
    (item) => item.model === 'MEMBERSHIP',
  );
  const transactionProduct = transactions?.find(
    (item) => item.model === 'PRODUCT',
  );

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
                      {user?.profile?.firstName ?? ''}{' '}
                      {user?.profile?.lastName ?? ''}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {process.env.NEXT_PUBLIC_SITE}/{user?.username ?? ''}
                    </p>
                  </div>

                  <div className="ml-auto">
                    <ButtonInput type="button" variant="danger">
                      Withdraw
                    </ButtonInput>
                  </div>
                </div>

                <div className="mt-3 flex items-center text-gray-900 dark:text-white">
                  <Link href="/settings/subscribes">
                    <span className="text-lg font-bold">
                      {user?.totalSubscribe ?? 0}
                    </span>
                    <span className="ml-2 text-sm font-normal">
                      {t('subscribes')}
                    </span>
                  </Link>

                  <Link href="/settings/followers">
                    <span className="ml-4 text-lg font-bold">
                      {user?.totalFollower ?? 0}
                    </span>
                    <span className="ml-2 text-sm font-normal">
                      {t('followers')}
                    </span>
                  </Link>

                  <Link href="/settings/followings">
                    <span className="ml-4 text-lg font-bold">
                      {user?.totalFollowing ?? 0}
                    </span>
                    <span className="ml-2 text-sm font-normal">
                      {t('followings')}
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
                    <ButtonInput type="button" size="sm" variant="outline">
                      {t('last_time_days', { day: dayCount })}
                    </ButtonInput>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-1 sm:gap-6 lg:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {t('memberships')}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <SerialPrice
                        className="text-xl font-bold text-gray-900 dark:text-white"
                        value={Number(transactionMembership?.statistic?.amount)}
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
                      {t('donations')}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <SerialPrice
                        className="text-xl font-bold text-gray-900 dark:text-white"
                        value={Number(transactionDonation?.statistic?.amount)}
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
                      {t('shop')}
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
                      <CiWallet className="size-14 shrink-0 text-gray-900 dark:text-white" />
                      <div className="ml-4">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          Secured Payments
                        </h3>
                        <p className="mt-1 text-sm font-normal text-gray-600 dark:text-white">
                          Make payment with ease
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <CiShop className="size-14 shrink-0 text-gray-900 dark:text-white" />
                      <div className="ml-4">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          Shop for Anyone
                        </h3>
                        <p className="mt-1 text-sm font-normal text-gray-600 dark:text-white">
                          You can shop for any category
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <CiUnlock className="size-14 shrink-0 text-gray-900 dark:text-white" />
                      <div className="ml-4">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          Membership
                        </h3>
                        <p className="mt-1 text-sm font-normal text-gray-600 dark:text-white">
                          Monthly membership for your biggest fans.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <CiGift className="size-14 shrink-0 text-gray-900 dark:text-white" />
                      <div className="ml-4">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          Quality Products
                        </h3>
                        <p className="mt-1 text-sm font-normal text-gray-600 dark:text-white">
                          Made with highest care
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

export default PrivateComponent(Dashboard);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
        ...(await import(`/lang/${locale}/common.json`)).default,
      },
    },
  };
}
