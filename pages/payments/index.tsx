import { LayoutDashboard } from '@/components/layout-dashboard';
import { TableOrderItemsUser } from '@/components/order-item/table-order-items-user';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';

const PaymentsIndex = () => {
  const user = useAuth() as any;

  return (
    <>
      <LayoutDashboard title={'Payments'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            {/* <HorizontalNavShop /> */}

            <div className="flow-root">
              {user?.organizationId ? (
                <TableOrderItemsUser
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

export default PrivateComponent(PaymentsIndex);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
