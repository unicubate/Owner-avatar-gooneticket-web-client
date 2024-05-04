import { GetOneOrderItemAPI } from '@/api-site/order-item';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ViewOrderItemEvent } from '@/components/order-item/view-order-item-event';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { useRouter } from 'next/router';
import { useState } from 'react';

const OrderView = () => {
  const [level, setLevel] = useState<string | number>('L');
  const { userStorage: user } = useInputState();
  const { query, push, back } = useRouter();
  const { model } = query;
  const orderNumber = String(query?.orderItemId);

  const {
    data: orderItem,
    isError: isErrorOrderItem,
    isLoading: isLoadingOrderItem,
  } = GetOneOrderItemAPI({
    orderNumber: orderNumber,
    organizationBuyerId: user?.organizationId,
  });

  const dataOrderItem = isLoadingOrderItem ? (
    <LoadingFile className="my-6" />
  ) : isErrorOrderItem ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : (
    <>
      {model === 'event' ? <ViewOrderItemEvent orderItem={orderItem} /> : null}
    </>
  );

  return (
    <>
      <LayoutDashboard title={'Order orders'}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              {/* <div className="sm:flex sm:items-center sm:justify-between">
                <ButtonInput
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => push(`/orders`)}
                  icon={<MoveLeftIcon className="size-4" />}
                />
              </div> */}
              <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 dark:bg-[#121212]">
                {dataOrderItem}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(OrderView);
