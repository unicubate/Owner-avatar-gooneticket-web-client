import { TableAffiliationsActivities } from '@/components/affiliates/activities/table-affiliations-activities';
import { TableAffiliations } from '@/components/affiliates/affiliations/table-affiliations';
import { PayoutFormUser } from '@/components/affiliates/settings/payout-form-user';
import { PayoutHistoryTable } from '@/components/affiliates/settings/payout-history-table';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { SerialPrice } from '@/components/ui-setting';
import { TooltipProviderInput } from '@/components/ui-setting/shadcn';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PrivateComponent } from '@/components/util/private-component';
import { ActivityIcon, SettingsIcon, UserPlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { capitalizeFirstLetter } from '../../utils/utils';

const AffiliationsIndex = () => {
  const { push, query, back, pathname } = useRouter();
  const { tab } = query;
  const { user } = useInputState() as any;
  const { t, search, handleSetSearch } = useInputState();

  const navigation = [
    {
      tab: 'all',
      title: `${t.formatMessage({ id: 'MENU.AFFILIATION' })}`,
      href: `/affiliations?tab=all`,
      icon: <UserPlusIcon className="size-5" />,
    },
    {
      tab: 'activity',
      title: `${t.formatMessage({ id: 'MENU.ACTIVITY' })}`,
      href: `/affiliations?tab=activity`,
      icon: <ActivityIcon className="size-5" />,
    },
    {
      tab: 'setting',
      title: `${t.formatMessage({ id: 'MENU.SETTING' })}`,
      href: `/affiliations?tab=setting`,
      icon: <SettingsIcon className="size-5" />,
    },
  ];
  const titleName = navigation.find((i) => i?.tab === tab);

  return (
    <>
      <LayoutDashboard title={`${titleName?.title}`}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="mx-auto max-w-max">
                <div className="dark:border-input dark:bg-background rounded-lg border bg-white p-2">
                  <nav className="flex flex-wrap gap-5">
                    {navigation.map((item: any, index: number) => {
                      const isActive = tab === item?.tab;
                      return (
                        <TooltipProviderInput
                          key={index}
                          description={item.title}
                        >
                          <Link
                            key={index}
                            href={item.href}
                            className={`group inline-flex items-center gap-1 whitespace-nowrap rounded-lg p-1 text-sm font-medium transition-all duration-200 ${
                              isActive
                                ? `text-blue-600`
                                : ` hover:text-blue-600`
                            } `}
                          >
                            {item.icon}

                            {item.title}
                          </Link>
                        </TooltipProviderInput>
                      );
                    })}
                  </nav>
                </div>
              </div>

              <Card
                className="sm:col-span-2 mt-4"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>
                    {capitalizeFirstLetter(user?.profile?.firstName ?? '')}{' '}
                    {capitalizeFirstLetter(user?.profile?.lastName ?? '')}
                  </CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic affiliations Dashboard for Seamless
                    Management and Insightful Analysis
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <SerialPrice
                    className="text-3xl font-bold"
                    value={Number(user?.wallet?.amountUser)}
                    currency={{
                      code: user?.profile?.currency?.code,
                      amount: user?.profile?.currency?.amount,
                    }}
                  />
                  {/* <div className="ml-auto flex flex-col items-center justify-center">
                    <ButtonInput size="sm" type="button" variant="outline">
                      {t.formatMessage({ id: 'TRANSACTION.WITHDRAW' })}
                    </ButtonInput>
                  </div> */}
                </CardFooter>
              </Card>

              {tab === 'all' && <TableAffiliations />}
              {tab === 'activity' && <TableAffiliationsActivities />}
              {tab === 'setting' && (
                <>
                  <PayoutFormUser />
                  <PayoutHistoryTable />
                </>
              )}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(AffiliationsIndex);
