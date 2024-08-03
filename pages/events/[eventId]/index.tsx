import { GetOneEventAPI } from '@/api-site/event';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { ViewOneEvent } from '@/components/event/view-one-event';
import { MediumFooter } from '@/components/footer/medium-footer';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layouts/user-public-site';
import { ProductSkeleton } from '@/components/skeleton/product-skeleton';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { useRouter } from 'next/router';

const ShopUserPublic = () => {
  const { query, push } = useRouter();
  const { userStorage: userBayer } = useInputState();

  const {
    isLoading: isLoadingEvent,
    isError: isErrorEvent,
    data: event,
  } = GetOneEventAPI({
    enableVisibility: 'TRUE',
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
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="border-gray-200 lg:col-span-3 xl:col-span-4">
              <div className="flow-root">
                {isPendingUser || isLoadingEvent ? (
                  <ProductSkeleton index={0} />
                ) : isErrorUser || isErrorEvent ? (
                  <ErrorFile
                    title="404"
                    description="Error find data please try again..."
                  />
                ) : (
                  <ViewOneEvent item={event} />
                )}
              </div>
            </div>
            {/* <div className="mt-2 grid grid-cols-1 gap-y-10 sm:mt-12 sm:grid-cols-1 sm:gap-8 lg:grid-cols-5 lg:items-start lg:gap-x-10 xl:grid-cols-6 xl:gap-x-10">
              <>
                <div className="border-gray-200 lg:col-span-3 xl:col-span-4">
                  <div className="flow-root">
                    {isLoadingEvent ? (
                      <ProductSkeleton index={0} />
                    ) : isErrorEvent ? (
                      <ErrorFile
                        title="404"
                        description="Error find data please try again..."
                      />
                    ) : (
                      <ViewOneEvent item={event} />
                    )}
                  </div>
                </div>

                <div className="lg:sticky lg:top-6 lg:order-2 lg:col-span-2">
                  <div className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-background">
                    <div className="flow-root">
                      {event?.id ? (
                        <PublicLastEvents
                          userVisitor={{
                            id: user?.id,
                            organizationId: user?.organizationId,
                          }}
                        />
                      ) : (
                        itemsNumberArray(4).map((i, index) => (
                          <li
                            key={index}
                            className="ml-4 flex items-center space-x-2 py-2"
                          >
                            <Skeleton className="size-16 rounded-md" />
                            <div className="space-y-1">
                              <Skeleton className="h-4 w-[200px]" />
                              <Skeleton className="h-4 w-[200px]" />
                            </div>
                          </li>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </>
            </div> */}
          </div>
          <MediumFooter />
        </div>
      </LayoutUserPublicSite>
    </>
  );
};

export default ShopUserPublic;
