import { GetOneOrderItemAPI } from '@/api-site/order-item';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ViewOrderItemEvent } from '@/components/order-item/view-order-item-event';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { useRouter } from 'next/router';

const TicketPublic = () => {
  const { query } = useRouter();
  const orderNumber = String(query?.oderItemId);

  const {
    data: orderItem,
    isError: isErrorOrderItem,
    isLoading: isLoadingOrderItem,
  } = GetOneOrderItemAPI({
    orderNumber: orderNumber,
    customer: 'buyer',
  });

  return (
    <>
      <LayoutDashboard title={`Order ${orderItem?.event?.title ?? ''}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="mt-2 overflow-hidden rounded-lg border bg-white dark:border-input dark:bg-background">
                {isLoadingOrderItem ? (
                  <LoadingFile className="my-6" />
                ) : isErrorOrderItem ? (
                  <ErrorFile
                    title="404"
                    description="Error find data please try again..."
                  />
                ) : (
                  <ViewOrderItemEvent orderItem={orderItem} />
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default TicketPublic;
