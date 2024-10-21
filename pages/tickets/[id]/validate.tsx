import { GetOneOrderItemAPI } from '@/api-site/order-item';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ViewOrderItemEvent } from '@/components/order-item/view-order-item-event';
import {
  ButtonInput,
  CopyShareLink,
  ErrorFile,
  LoadingFile,
} from '@/components/ui-setting';
import { PrivateComponent } from '@/components/util/private-component';
import { MoveLeftIcon, ShareIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Ticket = () => {
  const { t, ipLocation, loading, setLoading } = useInputState();
  const { query, push, back } = useRouter();
  const [copied, setCopied] = useState(false);
  const orderNumber = String(query?.id);

  const {
    data: orderItem,
    error: errorOrderItem,
    isError: isErrorOrderItem,
    isLoading: isLoadingOrderItem,
  } = GetOneOrderItemAPI({
    customer: 'buyer',
    orderNumber: orderNumber,
  });

  return (
    <>
      <LayoutDashboard title={`Order ${orderItem?.event?.title ?? ''}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="flex items-center">
                <div className="sm:mt-0">
                  <ButtonInput
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => back()}
                    icon={<MoveLeftIcon className="size-4" />}
                  >
                    {t.formatMessage({ id: 'UTIL.COME_BACK' })}
                  </ButtonInput>
                </div>
                {!orderItem?.confirmedAt && !orderItem?.eventDate?.isExpired ? (
                  <div className="ml-auto flex items-center gap-2">
                    <ButtonInput
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setCopied(true)}
                      icon={<ShareIcon className="size-4" />}
                    />
                  </div>
                ) : null}
              </div>

              <div className="dark:border-input dark:bg-background mt-2 overflow-hidden rounded-lg border bg-white">
                {isLoadingOrderItem ? (
                  <LoadingFile className="my-2" />
                ) : isErrorOrderItem ? (
                  <ErrorFile
                    title={errorOrderItem?.status ?? '404'}
                    description="Error find data please try later"
                  />
                ) : (
                  <ViewOrderItemEvent orderItem={orderItem} />
                )}
              </div>
            </div>
          </div>
        </div>
        <CopyShareLink
          isOpen={copied}
          setIsOpen={setCopied}
          link={`${ipLocation?.url}/tickets/${orderItem?.orderNumber}/validate-public`}
        />
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Ticket);
