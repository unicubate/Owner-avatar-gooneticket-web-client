import { GetOneOrderItemAPI } from '@/api-site/order-item';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { UpdateOrderItemForm } from '@/components/order-item/update-order-item-form';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { useRouter } from 'next/router';

const OrderItemConfirm = () => {
  const { query, push, back } = useRouter();
  const orderNumber = String(query?.orderItemId);

  const {
    data: item,
    isError: isErrorOrderItem,
    isLoading: isLoadingOrderItem,
  } = GetOneOrderItemAPI({
    orderNumber,
  });

  const dataProduct =
    isLoadingOrderItem ? (
      <LoadingFile className='my-6' />
    ) : isErrorOrderItem ? (
      <ErrorFile
        title="404"
        description="Error find data please try again..."
      />
    ) : (
      <UpdateOrderItemForm orderItem={item} />
    );

  return (
    <>
      <LayoutDashboard title={'Events orders'}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">

            <div className="flow-root">
              <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                {dataProduct}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(OrderItemConfirm);
