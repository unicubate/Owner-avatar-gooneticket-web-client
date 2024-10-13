import { GetOneOrderItemPublicAPI } from '@/api-site/order-item';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ViewOrderItemEvent } from '@/components/order-item/view-order-item-event';
import { ErrorFile, LoadingFile } from '@/components/ui-setting';
import { useRouter } from 'next/router';

const TicketPublic = () => {
  const { query } = useRouter();
  const { t } = useInputState();
  const orderNumber = String(query?.id);

  const {
    data: orderItem,
    isError: isErrorOrderItem,
    isLoading: isLoadingOrderItem,
  } = GetOneOrderItemPublicAPI({
    orderNumber: orderNumber,
  });

  return (
    <>
      <LayoutDashboard title={`Order ${orderItem?.event?.title ?? ''}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="dark:border-input dark:bg-background mt-2 overflow-hidden rounded-lg border bg-white">
                {isLoadingOrderItem ? (
                  <LoadingFile className="my-2" />
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
