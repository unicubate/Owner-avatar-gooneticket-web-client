import { GetInfiniteProductsAPI } from '@/api-site/product';
import { useInputState } from '@/components/hooks/use-input-state';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { EnableShop } from '@/components/shop/enable-shop';
import { HorizontalNavShop } from '@/components/shop/horizontal-nav-shop';
import { ListProductsShop } from '@/components/shop/list-products-shop';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { EmptyData, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { ProductModel } from '@/types/product';
import { PlusIcon, StoreIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const ShopsExtras = () => {
  const { search, handleSetSearch } = useInputState();
  const { organizationId, profile } = useAuth() as any;
  const router = useRouter();
  const [dayCount, setDayCount] = useState(30);
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    data: dataProduct,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    search,
    organizationId: organizationId,
    take: 10,
    sort: 'DESC',
    modelIds: ['PRODUCT'],
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
    <EmptyData
      image={<StoreIcon className="size-12" />}
      title="You haven't added anything yet."
      description={`Shop is a simple and effective way to offer something to your audience. It could be anything.`}
    />
  ) : (
    dataProduct?.pages
      .flatMap((page: any) => page?.data?.value)
      .map(
        (item: ProductModel, index: number) =>
          organizationId && (
            <ListProductsShop item={item} key={index} index={index} />
          ),
      )
  );

  return (
    <>
      <LayoutDashboard title={'Shop'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <HorizontalNavShop />

            {profile?.id ? <EnableShop profile={profile} /> : null}

            <div className="flow-root">
              <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                <div className="px-4 py-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="mt-4 sm:mt-0">
                      <ButtonInput
                        type="button"
                        className="w-full"
                        size="sm"
                        variant="info"
                        onClick={() => router.push(`${`/shop/create`}`)}
                        icon={<PlusIcon className="mr-2 size-4" />}
                      >
                        Create product
                      </ButtonInput>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <SearchInput
                        placeholder="Search by title"
                        onChange={handleSetSearch}
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {dataTableProducts}
                  </div>
                </div>
              </div>

              {hasNextPage && (
                <div className="mx-auto mt-4 justify-center text-center">
                  <ButtonLoadMore
                    isFetchingNextPage={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopsExtras);
