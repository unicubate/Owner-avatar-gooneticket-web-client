import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { TableOrderItemsUser } from '@/components/order-item/table-order-items-user';
import { PrivateComponent } from '@/components/util/private-component';

const PaymentsIndex = () => {
  const { userStorage } = useInputState() as any;

  return (
    <>
      <LayoutDashboard title={'Payments'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            {/* <HorizontalNavShop /> */}

            {userStorage?.organizationId && (
              <div className="flow-root">
                <TableOrderItemsUser
                  organizationId={userStorage?.organizationId}
                />
              </div>
            )}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PaymentsIndex);
