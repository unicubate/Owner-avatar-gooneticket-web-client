import { GetOneOrderItemAPI } from '@/api-site/order-item';
import { downloadOneUploadsAPI } from '@/api-site/upload';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ViewOrderItemEvent } from '@/components/order-item/view-order-item-event';
import {
  ButtonInput,
  CopyShareLink,
  ErrorFile,
  LoadingFile,
} from '@/components/ui-setting';
import { TooltipProviderInput } from '@/components/ui-setting/shadcn';
import { PrivateComponent } from '@/components/util/private-component';
import { AlertDangerNotification } from '@/utils';
import { capitalizeFirstLetter } from '@/utils/utils';
import {
  BadgeAlertIcon,
  CircleCheckBigIcon,
  DownloadIcon,
  MoveLeftIcon,
  ShareIcon,
} from 'lucide-react';
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

  const handleDownloadRows = async () => {
    setLoading(true);
    try {
      const response = await downloadOneUploadsAPI({
        folder: String(orderItem?.model.toLocaleLowerCase()),
        fileName: orderItem?.uploadsFileTicket?.path,
      });
      const link = document.createElement('a');
      link.href = response?.config?.url;
      link.click();
      link.remove();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      AlertDangerNotification({
        text: "C'è stato un errore.",
      });
    }
  };

  return (
    <>
      <LayoutDashboard title={`Order ${orderItem?.event?.title ?? ''}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="flex items-center">
                <div className="sm:mt-0">
                  <TooltipProviderInput
                    description={t.formatMessage({ id: 'UTIL.COME_BACK' })}
                  >
                    <ButtonInput
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => back()}
                      icon={<MoveLeftIcon className="size-4" />}
                    >
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {t.formatMessage({ id: 'UTIL.COME_BACK' })}
                      </span>
                    </ButtonInput>
                  </TooltipProviderInput>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  {['DELIVERED', 'CONFIRMED'].includes(orderItem?.status) && (
                    <TooltipProviderInput
                      description={capitalizeFirstLetter(orderItem?.status)}
                    >
                      <ButtonInput
                        icon={<CircleCheckBigIcon className="text-success" />}
                        type="button"
                        size="sm"
                        variant="outline"
                      />
                    </TooltipProviderInput>
                  )}

                  {!['DELIVERED', 'CONFIRMED'].includes(orderItem?.status) &&
                  orderItem?.eventDate?.isExpired ? (
                    <TooltipProviderInput
                      description={capitalizeFirstLetter(orderItem?.status)}
                    >
                      <ButtonInput
                        icon={<BadgeAlertIcon className="text-danger" />}
                        type="button"
                        size="sm"
                        variant="outline"
                      />
                    </TooltipProviderInput>
                  ) : (
                    ['ACCEPTED'].includes(orderItem?.status) && (
                      <TooltipProviderInput
                        description={capitalizeFirstLetter(orderItem?.status)}
                      >
                        <ButtonInput
                          icon={
                            <CircleCheckBigIcon className="text-gray-600" />
                          }
                          type="button"
                          size="sm"
                          variant="outline"
                        />
                      </TooltipProviderInput>
                    )
                  )}

                  <TooltipProviderInput
                    description={t.formatMessage({ id: 'UTIL.DOWNLOAD' })}
                  >
                    <ButtonInput
                      type="button"
                      size="sm"
                      variant="outline"
                      loading={loading}
                      onClick={() => handleDownloadRows()}
                      icon={<DownloadIcon className="size-4" />}
                    />
                  </TooltipProviderInput>

                  <TooltipProviderInput
                    description={t.formatMessage({ id: 'UTIL.SHARE' })}
                  >
                    <ButtonInput
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setCopied(true)}
                      icon={<ShareIcon className="size-4" />}
                    />
                  </TooltipProviderInput>
                </div>
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
