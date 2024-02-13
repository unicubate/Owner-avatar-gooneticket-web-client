import { GetStatisticsTransactionsAPI } from '@/api-site/transaction';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { TableOrderItemsSeller } from '@/components/order-item/table-order-items-seller';
import { HorizontalNavShop } from '@/components/shop/horizontal-nav-shop';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';
import { useState } from 'react';

const OrdersIndex = () => {
  const { userStorage: user, profile } = useAuth() as any;
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

            {/* {profile?.id ? <EnableShop profile={profile} /> : null} */}

            <div className="flow-root">
              {user?.organizationId ? (
                <TableOrderItemsSeller
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

export default PrivateComponent(OrdersIndex);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
