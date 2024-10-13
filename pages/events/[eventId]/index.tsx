import { GetOneEventAPI } from '@/api-site/event';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { ViewOneEvent } from '@/components/event/view-one-event';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layouts/user-public-site';
import { ProductSkeleton } from '@/components/skeleton/product-skeleton';
import { ErrorFile } from '@/components/ui-setting';
import { useRouter } from 'next/router';

const ShopUserPublic = () => {
  const { query, push } = useRouter();
  const { userStorage: userBayer } = useInputState();

  const {
    isLoading: isLoadingEvent,
    isError: isErrorEvent,
    data: event,
    error: errorEvent,
  } = GetOneEventAPI({
    enableVisibility: 'true',
    slugOrId: String(query?.eventId),
  });

  const {
    isPending: isPendingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({
    username: event?.profile?.username,
    organizationVisitorId: userBayer?.organizationId,
  });

  return (
    <>
      <LayoutUserPublicSite title={`${event?.title || 'Event'}`} user={user}>
        <div className="max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="border-gray-200 lg:col-span-3 xl:col-span-4">
              <div className="flow-root">
                <div className="dark:border-input dark:bg-background my-8 overflow-hidden rounded-lg border border-gray-100 bg-white">
                  {isPendingUser || isLoadingEvent ? (
                    <ProductSkeleton index={0} />
                  ) : isErrorUser || isErrorEvent ? (
                    <ErrorFile
                      title={errorEvent?.status ?? '404'}
                      description="Error find data please try again..."
                    />
                  ) : (
                    <ViewOneEvent item={event} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutUserPublicSite>
    </>
  );
};

export default ShopUserPublic;
