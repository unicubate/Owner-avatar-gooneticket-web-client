import { LayoutDashboard } from '@/components/layout-dashboard';
import { TableOrderItemsUser } from '@/components/order-item/table-order-items-user';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';

const PaymentsIndex = () => {
  const user = useAuth() as any;

  return (
    <>
      <LayoutDashboard title={'Payments'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            {/* <HorizontalNavShop /> */}

            <div className="flow-root">
              <TableOrderItemsUser
                model="PRODUCT"
                organizationId={user?.organizationId}
              />
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PaymentsIndex);
