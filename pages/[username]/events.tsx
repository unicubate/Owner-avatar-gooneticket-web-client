import { GetInfiniteProductsAPI } from '@/api-site/product';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { ListPublicProductsEvent } from '@/components/event/list-public-products-event';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { CreateConversationsModal } from '@/components/messages/create-conversations-modal';
import { ButtonLoadMore } from '@/components/ui-setting';
import { CoverComponent, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { ProductModel } from '@/types/product';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const EventsPublic = () => {
  const { search, handleSetSearch } = useInputState();
  const { ref, inView } = useInView();
  const { isOpen, setIsOpen, userStorage: userVisiter } = useInputState();
  const { query } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });

  const {
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    data: dataProduct,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    search,
    take: 10,
    sort: 'DESC',
    modelIds: ['EVENT'],
    organizationId: user?.organizationId
  });

  useEffect(() => {
    let fetching = false;
    if (inView) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  const dataTableProducts = isLoadingProduct ? (
    <LoadingFile />
  ) : isErrorProduct ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataProduct?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    dataProduct?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item: ProductModel, index: number) => (
        user?.organizationId ? <ListPublicProductsEvent item={item} key={index} index={index} /> : null
      ))
  );

  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName || 'User'} ${user?.profile?.lastName ?? ''
          }`}
        user={user}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:py-10">
          <div className="container mx-auto space-y-8 p-6">

            <div className="relative bg-gray-900 py-20 sm:py-20 lg:py-24 xl:py-32">
              <div className="absolute inset-0">
                <CoverComponent className="size-full object-cover" profile={user?.profile} />
              </div>

              <div className="absolute inset-0 bg-gray-900/50"></div>


              <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-max text-center">
                  <h1 className="text-3xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                    Events {user?.organization?.name}
                  </h1>

                </div>
              </div>
            </div>


            <div className="flow-root">

              <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">

                {dataTableProducts}

              </div>


              {hasNextPage && (
                <div className="mx-auto mt-4 justify-center text-center">
                  <ButtonLoadMore
                    ref={ref}
                    className="w-[240px]"
                    isFetchingNextPage={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                  />
                </div>
              )}
            </div>

          </div>
        </div>

        <CreateConversationsModal
          isOpen={isOpen}
          user={user}
          setIsOpen={setIsOpen}
        />
      </LayoutUserPublicSite>

      {status === 'pending' ? <LoadingFile /> : null}

      {status === 'error' ? (
        <ErrorFile
          title="404"
          description="Error find data please try again"
          className="dark:text-white"
        />
      ) : null}
    </>
  );
};

export default EventsPublic;
